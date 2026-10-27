"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function conferirPedido(pedidoId: string){
  if (
    typeof pedidoId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      pedidoId
    )
  ) {
    return {
      success: false,
      message: "Identificador do pedido inválido.",
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
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "Faça login para realizar esta operação.",
    };
  }

  // A política RLS também deve restringir a atualização
  // aos pedidos que este usuário está autorizado a gerenciar.
  const { data: pedido, error: selectError } = await supabase
    .from("pedidos")
    .select("id, status")
    .eq("id", pedidoId)
    .maybeSingle();

  if (selectError || !pedido) {
    return {
      success: false,
      message: "Pedido não encontrado ou sem permissão de acesso.",
    };
  }

  if (pedido.status !== "pendente") {
    return {
      success: false,
      message: "Somente pedidos pendentes podem ser conferidos.",
    };
  }

  const { error: updateError } = await supabase
    .from("pedidos")
    .update({
      status: "conferido",
      conferido_em: new Date().toISOString(),
    })
    .eq("id", pedidoId);

  if (updateError) {
    console.error("Erro ao conferir pedido:", updateError.message);

    return {
      success: false,
      message: "Não foi possível atualizar o pedido.",
    };
  }

  revalidatePath("/admin/pedidos");

  return {
    success: true,
    message: "Pedido marcado como conferido.",
  };
}
