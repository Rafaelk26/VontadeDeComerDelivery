// Database
import { supabase } from "@/server/supabase/supabase";

export async function getAllProducts(){
    try{
        const { data, error } = await supabase
        .from("produtos")
        .select("*");

        if(error) throw new Error("Erro no processo de busca.");

        return data;
    }
    catch(err){
        console.error("Erro ao buscar produtos", err);
    }
}