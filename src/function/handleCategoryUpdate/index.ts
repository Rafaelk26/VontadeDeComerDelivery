// Database
import { supabase } from "@/server/supabase/supabase";

// Type
import { Category, NewCategory } from "@/types/Categories";

type ProductUpdate = Partial<NewCategory>;

export async function handleCategoryUpdate(
  id: Category["id"],
  changes: ProductUpdate
) {
  const { data, error } = await supabase
    .from("categoria")
    .update(changes)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao editar categoria:", error);
    throw error;
  }

  return data;
}
