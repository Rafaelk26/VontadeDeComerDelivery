// Database
import { supabase } from "@/server/supabase/supabase";

// Cache
import { adminDataCache } from "@/lib/cache/adminCache";

// Type
import type { Product } from "@/types/Products";

export async function getAllProducts(): Promise<Product[] | null>{
  if (adminDataCache.products !== null) {
    return adminDataCache.products;
  }

  try {
    const { data, error } = await supabase
      .from("produtos")
      .select("*");

    if (error) {
      throw error;
    }

    const products = (data ?? []) as Product[];

    adminDataCache.products = products;
    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return null;
  }
}
