// Type
import type { itemCartProps } from "@/context/Cart/useCart";

type ProductsToWhatsAppProps = {
  cart: itemCartProps[];
  description: string;
  itemsQuantity: number;
  subtotal: number;
  shipping: number;
  total: number;
  methodoPayment: string;
};

const formatCurrency = (value: number)=> value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const paymentMethods: Record<string, string> = {
  debito: "Cartão de débito",
  credito: "Cartão de crédito",
  pix: "Pix",
  dinheiro: "Dinheiro",
};

export function formatProductsToWhatsApp({ cart, description, itemsQuantity, subtotal, shipping, methodoPayment, total }: ProductsToWhatsAppProps): string{
  const productsMessage = cart.map((item, index)=> {
      const quantity = Number(item.quantity);
      const price = Number(item.price);

      return [
        `*${index + 1}. ${item.name}*`,
        `   Quantidade: ${quantity}`,
        `   Preço unitário: ${formatCurrency(price)}`,
        item.description?.trim()
          ? `   Descrição: ${item.description.trim()}`
          : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  const observation =
    description.trim() &&
    description.trim() !== "Nenhuma observação."
      ? description.trim()
      : "Nenhuma";

  const payment =
    paymentMethods[methodoPayment] ?? methodoPayment;

  return [
    "*🛒 NOVO PEDIDO — VONTADE DE COMER*",
    "",
    "----------------------------",
    "",
    "*📦 ITENS DO PEDIDO*",
    "",
    productsMessage,
    "",
    "----------------------------",
    "",
    "*📝 OBSERVAÇÕES DO CLIENTE*",
    observation,
    "",
    "----------------------------",
    "",
    "*💳 FORMA DE PAGAMENTO*",
    payment || "Não selecionada",
    "",
    "----------------------------",
    "",
    "*📃 RESUMO DO PEDIDO*",
    "",
    "----------------------------",
    "",
    `Quantidade de itens: ${itemsQuantity}`,
    `Subtotal dos produtos: ${formatCurrency(subtotal)}`,
    `Frete: ${shipping === 0 ? "Grátis" : formatCurrency(shipping)}`,
    `*TOTAL: ${formatCurrency(total)}*`,
    "",
    "----------------------------",
    "",
    "Pedido enviado pelo site. Aguardo confirmação aqui no whatsapp!",
  ].join("\n");
}
