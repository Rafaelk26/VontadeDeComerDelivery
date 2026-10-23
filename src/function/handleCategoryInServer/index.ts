// Database
import { supabase } from "@/server/supabase/supabase";

// Type
import type { NewCategory } from "@/types/Categories";

export async function handleCategoryInServer(obj: NewCategory){
  try{
        const { data, error } = await supabase
        .from("categoria")
        .insert(obj)
        .select()
        .single();

    if(error){
        console.error("Erro ao inserir categoria:", error);
        throw error;
    }

    return data;
  }
  catch(err){
    console.error("Erro ao inserir categoria nova", err);
    return;
  }
}