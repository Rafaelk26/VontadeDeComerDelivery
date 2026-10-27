"use server";
import { createClient } from "@supabase/supabase-js";
import type { itemCartProps } from "@/context/Cart/useCart";

type CriarPedidoInput = {
  cart: Pick<itemCartProps, "id" | "quantity">[];
  description: string;
  methodoPayment: string;
};

const paymentMethods = [
  "debito",
  "credito",
  "pix",
  "dinheiro",
];

function createAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Configuração do Supabase ausente.");
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function criarPedidoWhatsApp(input: CriarPedidoInput) {
  if (
    !Array.isArray(input.cart) ||
    input.cart.length === 0 ||
    input.cart.length > 100
  ) {
    throw new Error("Carrinho vazio ou inválido.");
  }

  if (!paymentMethods.includes(input.methodoPayment)) {
    throw new Error("Forma de pagamento inválida.");
  }

  const observacao = String(input.description ?? "").trim();

  if (observacao.length > 2000) {
    throw new Error("A observação ultrapassa o limite permitido.");
  }

  const quantities = new Map<string, number>();

  for (const item of input.cart) {
    const id = String(item.id);
    const quantity = Number(item.quantity);

    if (
      !id ||
      !Number.isSafeInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      throw new Error("Produto ou quantidade inválida.");
    }

    quantities.set(id, (quantities.get(id) ?? 0) + quantity);
  }

  const supabase = createAdminSupabase();
  const productIds = [...quantities.keys()];

  const { data: products, error: productsError } = await supabase
    .from("produtos")
    .select("id, name, price, status")
    .in("id", productIds);

  if (productsError || !products || products.length !== productIds.length) {
    throw new Error("Não foi possível validar os produtos do pedido.");
  }

  // Adapte esta condição caso o campo status use outra convenção.
  const unavailable = products.some(
    (product) =>
      product.status === "inativo" ||
      product.status === "Inativo" ||
      product.status === false
  );

  if (unavailable) {
    throw new Error("Um ou mais produtos não estão disponíveis.");
  }

  const items = products.map((product) => {
    const quantity = quantities.get(String(product.id))!;
    const price = Number(product.price);

    if (!Number.isFinite(price) || price < 0) {
      throw new Error("Um produto possui preço inválido.");
    }

    const priceInCents = Math.round(price * 100);
    const subtotalInCents = priceInCents * quantity;

    return {
      produto_id: product.id,
      nome_produto: product.name,
      preco_unitario: priceInCents / 100,
      quantidade: quantity,
      subtotal: subtotalInCents / 100,
      subtotalInCents,
    };
  });

  const quantityTotal = items.reduce(
    (sum, item) => sum + item.quantidade,
    0
  );

  const subtotalInCents = items.reduce(
    (sum, item) => sum + item.subtotalInCents,
    0
  );

  // Regra atual do projeto: frete grátis a partir de 5 unidades.
  const shippingInCents = quantityTotal >= 5 ? 0 : 500;
  const totalInCents = subtotalInCents + shippingInCents;

  const orderCode =
    `VDC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const { data: order, error: orderError } = await supabase
    .from("pedidos")
    .insert({
      codigo: orderCode,
      user_id: null,
      status: "pendente",
      subtotal: subtotalInCents / 100,
      frete: shippingInCents / 100,
      total: totalInCents / 100,
      forma_pagamento: input.methodoPayment,
      observacao: observacao || null,
    })
    .select("id, codigo, subtotal, frete, total, forma_pagamento, observacao, created_at")
    .single();

  if (orderError || !order) {
    console.error("Erro ao criar pedido:", orderError?.message);
    throw new Error("Não foi possível registrar o pedido.");
  }

  const { error: itemsError } = await supabase
    .from("pedido_itens")
    .insert(
      items.map((item) => ({
        pedido_id: order.id,
        produto_id: item.produto_id,
        nome_produto: item.nome_produto,
        preco_unitario: item.preco_unitario,
        quantidade: item.quantidade,
        subtotal: item.subtotal,
      }))
    );

  if (itemsError) {
    console.error("Erro ao salvar itens:", itemsError.message);

    // Evita deixar um pedido incompleto se a gravação dos itens falhar.
    await supabase.from("pedidos").delete().eq("id", order.id);

    throw new Error("Não foi possível registrar os itens do pedido.");
  }

  return {
    order,
    items: items.map(({ subtotalInCents, ...item }) => item),
    itemsQuantity: quantityTotal,
  };
}
