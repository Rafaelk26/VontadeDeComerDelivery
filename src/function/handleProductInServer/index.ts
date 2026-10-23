// Database
import { supabase } from "@/server/supabase/supabase";

// Type
import type { NewProduct } from "@/types/Products";

export async function handleProductInServer(obj: NewProduct){
  const { data, error } = await supabase
    .from("produtos")
    .insert(obj)
    .select()
    .single();

  if (error) {
    console.error("Erro ao cadastrar produto:", error);
    throw error;
  }

  return data;
}
