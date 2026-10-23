// Types
import type { Product } from "@/types/Products";
import type { Category } from "@/types/Categories";

type AdminDataCache = {
  products: Product[] | null;
  categories: Category[] | null;
};

export const adminDataCache: AdminDataCache = {
  products: null,
  categories: null,
};

export function clearAdminDataCache(){
  adminDataCache.products = null;
  adminDataCache.categories = null;
}
