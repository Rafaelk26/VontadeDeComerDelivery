export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  size?: string;
  status?: boolean;
  photo: string;
};

export type NewProduct = Omit<Product, "id">;