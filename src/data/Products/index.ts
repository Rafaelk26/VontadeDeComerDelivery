export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  size: string;
  status?: boolean;
  image: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Caldo de mandioca com carne seca",
    category: "Caldos",
    description: "Caldo de mandioca cremoso com carne seca e temperos especiais.",
    price: "12",
    size: "300ml",
    image: "/Caldo.png",
  },

  {
    id: "2",
    name: "Caldo verde",
    category: "Caldos",
    description: "Caldo cremoso de batata com couve e linguiça defumada.",
    price: "11",
    size: "300ml",
    status: true,
    image: "/Caldo.png",
  },

  {
    id: "3",
    name: "Marmita de frango grelhado",
    category: "Marmitas",
    description: "Frango grelhado acompanhado de arroz, feijão e salada.",
    price: "18",
    size: "500g",
    status: true,
    image: "/Caldo.png",
  },

  {
    id: "4",
    name: "Marmita de carne acebolada",
    category: "Marmitas",
    description: "Carne acebolada acompanhada de arroz, feijão e batata.",
    price: "21",
    size: "500g",
    image: "/Caldo.png",
  },

  {
    id: "5",
    name: "Pudim de leite condensado",
    category: "Sobremesas",
    description: "Pudim cremoso de leite condensado com calda de caramelo.",
    price: "8",
    size: "120g",
    image: "/Caldo.png",
  },

  {
    id: "6",
    name: "Mousse de chocolate",
    category: "Sobremesas",
    description: "Mousse de chocolate cremoso preparado com chocolate especial.",
    price: "7",
    size: "120g",
    image: "/Caldo.png",
  },

  {
    id: "7",
    name: "Coca-Cola",
    category: "Bebidas",
    description: "Refrigerante Coca-Cola gelado.",
    price: "6",
    size: "350ml",
    image: "/Caldo.png",
  },

  {
    id: "8",
    name: "Guaraná Antarctica",
    category: "Bebidas",
    description: "Refrigerante Guaraná Antarctica gelado.",
    price: "6",
    size: "350ml",
    image: "/Caldo.png",
  },

  {
    id: "9",
    name: "Combo Caldo + Coca-Cola",
    category: "Promoções",
    description: "Um caldo de sua escolha acompanhado de uma Coca-Cola.",
    price: "16",
    size: "300ml + 350ml",
    image: "/Caldo.png",
  },
];