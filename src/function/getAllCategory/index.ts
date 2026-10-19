// Database
import { supabase } from "@/server/supabase/supabase";

export async function getAllCategories(){
    try{
        const { data, error } = await supabase
        .from("categoria")
        .select("*");

        if(error) throw new Error("Erro no processo de busca.");

        return data;
    }
    catch(err){
        console.error("Erro ao buscar categorias", err);
    }
}