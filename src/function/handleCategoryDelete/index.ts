// Database
import { supabase } from "@/server/supabase/supabase";

// Type
import { Category } from "@/types/Categories";

export async function handleCategoryDelete(id: Category["id"]) {
  const { data, error } = await supabase
    .from("categoria")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error("Erro ao excluir categoria:", error);
    throw error;
  }

  return data;
}
