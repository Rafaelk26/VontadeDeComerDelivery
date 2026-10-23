// Database
import { supabase } from "@/server/supabase/supabase";

// Type
import type { Product, NewProduct } from "@/types/Products";

type ProductUpdate = Partial<NewProduct>;

export async function handleProductUpdate(
  id: Product["id"],
  changes: ProductUpdate
) {
  const { data, error } = await supabase
    .from("produtos")
    .update(changes)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao editar produto:", error);
    throw error;
  }

  return data;
}
