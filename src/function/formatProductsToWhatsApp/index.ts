// Types
type WhatsAppOrder = {
  order: {
    codigo: string;
    subtotal: number;
    frete: number;
    total: number;
    forma_pagamento: string | null;
    observacao: string | null;
  };
  items: {
    nome_produto: string;
    preco_unitario: number;
    quantidade: number;
    subtotal: number;
  }[];
  itemsQuantity: number;
};

const formatCurrency = (value: number) =>
  Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const paymentMethods: Record<string, string> = {
  debito: "Cartão de débito",
  credito: "Cartão de crédito",
  pix: "Pix",
  dinheiro: "Dinheiro",
};

export function formatProductsToWhatsApp({ order, items, itemsQuantity }: WhatsAppOrder): string {
  const productsMessage = items
    .map((item, index) =>
      [
        `*${index + 1}. ${item.nome_produto}*`,
        `   Quantidade: ${item.quantidade}`,
        `   Preço unitário: ${formatCurrency(item.preco_unitario)}`,
      ].join("\n")
    )
    .join("\n\n");

  const payment =
    paymentMethods[order.forma_pagamento ?? ""] ??
    order.forma_pagamento ??
    "Não selecionada";

  return [
    "*VONTADE DE COMER | PEDIDO*",
    "Solicitação de novo pedido",
    "",
    "----------------------------",
    "",
    "*ITENS DO PEDIDO*",
    "",
    productsMessage,
    "",
    "----------------------------",
    "",
    "*RESUMO*",
    "",
    `Código do pedido: ${order.codigo}`,
    "Valores registrados no sistema estão sujeitos à confirmação do estabelecimento.",
    "",
    `Quantidade de unidades: ${itemsQuantity}`,
    `Subtotal dos produtos: ${formatCurrency(order.subtotal)}`,
    `Frete: ${
      Number(order.frete) === 0
        ? "Grátis"
        : formatCurrency(order.frete)
    }`,
    `*TOTAL REGISTRADO: ${formatCurrency(order.total)}*`,
    "",
    "----------------------------",
    "",
    "*FORMA DE PAGAMENTO*",
    payment,
    "",
    "----------------------------",
    "",
    "*OBSERVAÇÕES*",
    order.observacao || "Nenhuma",
    "",
    "----------------------------",
    "",
    "*IMPORTANTE*",
    "Esta mensagem é uma solicitação de pedido, não uma confirmação de compra.",
    "Os produtos, preços, disponibilidade, frete e valor final serão conferidos pelo estabelecimento antes da confirmação.",
    "Em caso de divergência, o estabelecimento informará os valores corretos e as condições aplicáveis antes de confirmar o pedido.",
    "",
    "Pedido enviado pelo site Vontade de Comer.",
  ].join("\n");
}
