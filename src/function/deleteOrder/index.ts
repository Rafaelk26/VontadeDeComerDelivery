"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const ADMIN_UID = "ebec104f-da40-434f-a560-ea63eef96371";

export async function deleteOrder(pedidoId: string){
  if(!pedidoId){
    return {
      success: false,
      message: "ID do pedido inválido.",
    };
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options })=> {
              cookieStore.set(name, value, options);
            });
          } catch {
            // A renovação dos cookies pode ser tratada pelo proxy.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user || user.id !== ADMIN_UID) {
    return {
      success: false,
      message: "Você não tem permissão para excluir pedidos.",
    };
  }

  const { data: pedido, error: buscaError } = await supabase
    .from("pedidos")
    .select("id")
    .eq("id", pedidoId)
    .maybeSingle();

  if (buscaError || !pedido) {
    return {
      success: false,
      message: "Pedido não encontrado ou não foi possível consultá-lo.",
    };
  }

  const { error: deleteError } = await supabase
    .from("pedidos")
    .delete()
    .eq("id", pedidoId)
    .select("id")
    .maybeSingle();

  if (deleteError) {
    console.error("Erro ao excluir pedido:", deleteError.message);

    return {
      success: false,
      message:
        "Não foi possível excluir o pedido. Verifique as permissões e o relacionamento com os itens.",
    };
  }

  return {
    success: true,
    message: "Pedido excluído com sucesso.",
  };
}