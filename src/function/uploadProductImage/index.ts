// Database
import { supabase } from "@/server/supabase/supabase";

export async function uploadProductImage(file: File){
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if(!allowedTypes.includes(file.type)){
        throw new Error("Utilize uma imagem JPG, PNG ou WebP.");
    }

    const maxSize = 5 * 1024 * 1024;

    if(file.size > maxSize){
        throw new Error("A imagem deve ter no máximo 5 MB.");
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
        .from("produtos_imagem")
        .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
        });

    if (uploadError) {
        console.error("Erro ao enviar imagem:", uploadError);
        throw uploadError;
    }

    const { data } = supabase.storage
        .from("produtos_imagem")
        .getPublicUrl(filePath);

    return {
        path: filePath,
        url: data.publicUrl,
    };
}
