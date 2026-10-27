
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { HeaderAdmin } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";
import { PedidosList } from "./PedidosList";

export const dynamic = "force-dynamic";

export default async function PedidosPage() {
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
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // A renovação dos cookies também pode ser tratada
            // pelo proxy de autenticação do projeto.
          }
        },
      },
    }
  );

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  const { data: pedidos, error } = await supabase
    .from("pedidos")
    .select(`
      id,
      codigo,
      status,
      subtotal,
      frete,
      total,
      forma_pagamento,
      observacao,
      created_at,
      conferido_em,
      user_id,
      pedido_itens (
        id,
        produto_id,
        nome_produto,
        preco_unitario,
        quantidade,
        subtotal
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao carregar pedidos:", error.message);

    return (
      <>
        <HeaderAdmin />
        <main className="min-h-screen bg-#050706 px-4 py-10 text-white">
          <Wrapper>
            <h1 className="text-2xl font-bold">Pedidos</h1>
            <p className="mt-4 text-red-400">
              Não foi possível carregar os pedidos.
              Verifique as tabelas, as permissões e as políticas RLS.
            </p>
          </Wrapper>
        </main>
      </>
    );
  }

  return (
    <>
      <HeaderAdmin />

      <main className="min-h-screen bg-#050706 px-4 py-8 text-white">
        <Wrapper>
          <div className="mb-8 mt-20">
            <h1 className="text-3xl font-semibold font-google">
              Pedidos
            </h1>

            <p className="mt-2 text-stone-400 font-google">
              Consulte os pedidos, confira os valores e acompanhe
              cada solicitação.
            </p>
          </div>

          <PedidosList pedidos={pedidos ?? []} />
        </Wrapper>
      </main>
    </>
  );
}
