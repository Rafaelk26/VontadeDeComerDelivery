// Database
import { supabase } from "@/server/supabase/supabase";

export async function handleLoginInServer(email:string, password:string){
    const { data, error } = await supabase
    .auth.signInWithPassword({
        email: email,
        password: password,
    });

    if(error){
        return {
        success: false,
        message: "Usuário ou senha inválidos!",
        }
    }

    return {
        success: true,
        user: data.user,
        session: data.session
    }
}