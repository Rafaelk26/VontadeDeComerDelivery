// Database
import { supabase } from "@/server/supabase/supabase";

// Cache
import { adminDataCache } from "@/lib/cache/adminCache";

// Type
import type { Category } from "@/types/Categories";

export async function getAllCategories(): Promise<Category[] | null>{
  if (adminDataCache.categories !== null) {
    return adminDataCache.categories;
  }

  try{
    const { data, error } = await supabase
      .from("categoria")
      .select("*");

    if(error){
      throw error;
    }

    const categories = (data ?? []) as Category[];

    adminDataCache.categories = categories;

    return categories;
  } 
  catch(error){
    console.error("Erro ao buscar categorias:", error);
    return null;
  }
}
