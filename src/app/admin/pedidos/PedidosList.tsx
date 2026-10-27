"use client";
import { useState } from "react";

// Functions
import { conferirPedido } from "@/function/checkOrder";
import { deleteOrder } from "@/function/deleteOrder";

// Types

type PedidoItem = {
  id: string;
  produto_id: string | null;
  nome_produto: string;
  preco_unitario: number;
  quantidade: number;
  subtotal: number;
};

type Pedido = {
  id: string;
  codigo: string;
  status: string;
  subtotal: number;
  frete: number;
  total: number;
  forma_pagamento: string | null;
  observacao: string | null;
  created_at: string;
  conferido_em: string | null;
  user_id: string;
  pedido_itens: PedidoItem[];
};

const moeda = (valor: number) =>
  Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const dataFormatada = (data: string) =>
  new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

const statusLabel: Record<string, string> = {
  pendente: "Pendente",
  conferido: "Conferido",
  confirmado: "Confirmado",
  em_preparo: "Em preparo",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export function PedidosList({
  pedidos,
}: {
  pedidos: Pedido[];
}) {
  const [abertos, setAbertos] = useState<string[]>([]);
  const [carregando, setCarregando] = useState<string | null>(null);
  const [mensagens, setMensagens] = useState<Record<string, string>>({});

  function alternarPedido(id: string){
    setAbertos((atuais)=>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    );
  }

  async function handleConferir(pedidoId: string){
    setCarregando(pedidoId);
    setMensagens((atuais)=> ({
      ...atuais,
      [pedidoId]: "",
    }));

    try {
      const resultado = await conferirPedido(pedidoId);

      setMensagens((atuais)=> ({
        ...atuais,
        [pedidoId]: resultado.message,
      }));

      if(resultado.success){
        window.location.reload();
      }
    } catch {
      setMensagens((atuais)=> ({
        ...atuais,
        [pedidoId]: "Não foi possível conferir este pedido.",
      }));
    } finally {
      setCarregando(null);
    }
  }

  async function handleExcluir(pedidoId: string){
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir este pedido? Essa ação não poderá ser desfeita."
    );

    if (!confirmar) return;

    setCarregando(pedidoId);
    setMensagens((atuais) => ({
      ...atuais,
      [pedidoId]: "",
    }));

    try {
      const resultado = await deleteOrder(pedidoId);

      setMensagens((atuais) => ({
        ...atuais,
        [pedidoId]: resultado.message,
      }));

      if (resultado.success) {
        window.location.reload();
      }
    } catch {
      setMensagens((atuais) => ({
        ...atuais,
        [pedidoId]: "Não foi possível excluir este pedido.",
      }));
    } finally {
      setCarregando(null);
    }
  }

  if(pedidos.length === 0){
    return (
      <div className="rounded-xl border border-stone-700/40 bg-#050706 p-8 text-center">
        <p className="text-lg font-semibold font-google">
          Nenhum pedido encontrado
        </p>
        <p className="mt-2 text-sm text-stone-400 font-google">
          Os pedidos registrados aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pedidos.map((pedido)=> {
        const aberto = abertos.includes(pedido.id);
        const itens = pedido.pedido_itens ?? [];

        const subtotalCalculado = itens.reduce(
          (acc, item) =>
            acc +
            Number(item.preco_unitario) *
              Number(item.quantidade),
          0
        );

        const totalCalculado =
          subtotalCalculado + Number(pedido.frete);

        const subtotalConfere =
          Math.abs(
            subtotalCalculado - Number(pedido.subtotal)
          ) < 0.01;

        const totalConfere =
          Math.abs(
            totalCalculado - Number(pedido.total)
          ) < 0.01;

        const valoresConferem =
          subtotalConfere && totalConfere;

        return (
          <article
            key={pedido.id}
            className="overflow-hidden rounded-xl border border-[#393939] bg-[#050706]"
          >
            <button
              type="button"
              onClick={() => alternarPedido(pedido.id)}
              aria-expanded={aberto}
              className="flex w-full flex-col gap-4 p-4 text-left transition font-google
              hover:bg-mist-900/20 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="min-w-0">
                <h2 className="break-all font-bold text-white">
                  {pedido.codigo}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {dataFormatada(pedido.created_at)}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  {itens.reduce(
                    (acc, item) => acc + Number(item.quantidade),
                    0
                  )}{" "}
                  unidade(s)
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-400">
                    Total registrado
                  </p>

                  <p className="text-xl font-bold text-white">
                    {moeda(Number(pedido.total))}
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-stone-400 px-3 py-1 text-xs text-gray-200">
                    {statusLabel[pedido.status] ?? pedido.status}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="text-xl text-gray-400"
                >
                  {aberto ? "−" : "+"}
                </span>
              </div>
            </button>

            {aberto && (
              <div className="space-y-5 border-t border-stone-400 p-4 sm:p-5">
                <div>
                  <h3 className="mb-3 font-semibold font-google">
                    Produtos do pedido
                  </h3>

                  {itens.length === 0 ? (
                    <p className="text-sm text-gray-400 font-google">
                      Este pedido não possui itens registrados.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {itens.map((item) => {
                        const subtotalItem =
                          Number(item.preco_unitario) *
                          Number(item.quantidade);

                        const subtotalItemConfere =
                          Math.abs(
                            subtotalItem - Number(item.subtotal)
                          ) < 0.01;

                        return (
                          <div
                            key={item.id}
                            className="rounded-lg border border-stone-800 p-3 font-google"
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                              <div>
                                <p className="font-medium">
                                  {item.nome_produto}
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                  {item.quantidade} ×{" "}
                                  {moeda(Number(item.preco_unitario))}
                                </p>
                              </div>

                              <div className="sm:text-right">
                                <p className="font-semibold">
                                  {moeda(Number(item.subtotal))}
                                </p>

                                <p className="text-xs text-gray-400">
                                  Subtotal registrado
                                </p>
                              </div>
                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                              Subtotal recalculado:{" "}
                              {moeda(subtotalItem)}
                            </p>

                            <p
                              className={`mt-1 text-xs ${
                                subtotalItemConfere
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {subtotalItemConfere
                                ? "Subtotal do item confere"
                                : "Divergência no subtotal do item"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="rounded-lg bg-[#28282855] p-4 font-google">
                  <h3 className="mb-3 font-semibold">
                    Resumo financeiro
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400">
                        Subtotal registrado
                      </span>
                      <span>{moeda(Number(pedido.subtotal))}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400">
                        Subtotal recalculado
                      </span>
                      <span>{moeda(subtotalCalculado)}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400">Frete</span>
                      <span>{moeda(Number(pedido.frete))}</span>
                    </div>

                    <div className="flex justify-between gap-4 border-t border-gray-800 pt-3 font-bold">
                      <span>Total registrado</span>
                      <span>{moeda(Number(pedido.total))}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400">
                        Total recalculado
                      </span>
                      <span>{moeda(totalCalculado)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm font-google">
                  <p>
                    <span className="text-gray-400">
                      Pagamento informado:{" "}
                    </span>
                    {pedido.forma_pagamento || "Não informado"}
                  </p>

                  <p>
                    <span className="text-gray-400 font-google">
                      Observações:{" "}
                    </span>
                    {pedido.observacao || "Nenhuma"}
                  </p>
                </div>

                <div
                  className={`rounded-lg border p-4 ${
                    valoresConferem
                      ? "border-green-800 bg-green-950/30"
                      : "border-red-800 bg-red-950/30"
                  }`}
                >
                  <p
                    className={`font-semibold font-google ${
                      valoresConferem
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {valoresConferem
                      ? "Os cálculos do pedido conferem"
                      : "Atenção: foram encontradas divergências"}
                  </p>

                  <p className="mt-1 text-sm text-gray-300 font-google">
                    Esta verificação compara os valores armazenados
                    entre si. Ela não comprova que os preços
                    correspondem à mensagem recebida no WhatsApp.
                  </p>
                </div>

                {pedido.status === "pendente" && (
                  <button
                    type="button"
                    disabled={carregando === pedido.id}
                    onClick={() => handleConferir(pedido.id)}
                    className="w-full rounded-lg bg-orange-600 px-4 py-3 font-semibold text-white cursor-pointer
                    transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {carregando === pedido.id
                      ? "Conferindo..."
                      : "Marcar como conferido"}
                  </button>
                )}

                <button
                  type="button"
                  disabled={carregando === pedido.id}
                  onClick={() => handleExcluir(pedido.id)}
                  className="w-full rounded-lg border border-red-700 px-4 py-3 cursor-pointer
                    font-semibold text-red-400 transition hover:bg-red-950/40
                    disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto font-google"
                >
                  {carregando === pedido.id
                    ? "Processando..."
                    : "Excluir pedido"}
                </button>

                {mensagens[pedido.id] && (
                  <p
                    role="status"
                    className="text-sm text-gray-300"
                  >
                    {mensagens[pedido.id]}
                  </p>
                )}

                {pedido.conferido_em && (
                  <p className="text-xs text-gray-400 font-google">
                    Conferido em: {dataFormatada(pedido.conferido_em)}
                  </p>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
