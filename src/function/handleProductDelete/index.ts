// Database
import { supabase } from "@/server/supabase/supabase";

// Type
import type { Product } from "@/types/Products";

export async function handleProductDelete(id: Product["id"]) {
  const { data, error } = await supabase
    .from("produtos")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }

  return data;
}
