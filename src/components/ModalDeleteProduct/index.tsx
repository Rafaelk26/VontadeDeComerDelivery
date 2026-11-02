"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

// Components
import { Button, ButtonCancel } from "@/components/Button";

// Functions
import { handleProductDelete } from "@/function/handleProductDelete";
import { clearAdminDataCache } from "@/lib/cache/adminCache";

// Types
import type { Product } from "@/types/Products";

type ModalDeleteProductProps = {
  product: Product;
  onClose: () => void;
  onDelete: (productId: Product["id"]) => void;
};

export function ModalDeleteProduct({
  product,
  onClose,
  onDelete,
}: ModalDeleteProductProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (deleting) return;

    setDeleting(true);

    try {
      await handleProductDelete(product.id);

      clearAdminDataCache();

      // Atualiza a lista no componente pai
      onDelete(product.id);

      toast.dismiss();
      toast.success("Produto deletado com sucesso.", {
        toastId: `delete-product-${product.id}`,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);

      toast.error("Não foi possível deletar o produto. Tente novamente.", {
        toastId: `delete-product-error-${product.id}`,
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/90 p-3 sm:p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !deleting
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-product-title"
        className="my-auto h-max max-h-[95dvh] w-full max-w-lg overflow-y-auto rounded-xl border border-[#747474] bg-[#0C0C0C] p-4 sm:p-5"
      >
        <h1
          id="delete-product-title"
          className="font-google text-lg font-medium sm:text-xl"
        >
          Deseja deletar esse produto?
        </h1>

        <div className="my-10 flex flex-col items-center gap-3 sm:my-16">
          <Image
            className="h-14 w-14 rounded-md border border-[#747474] object-cover"
            width={100}
            height={100}
            src={product.photo}
            alt={product.name}
            unoptimized
          />

          <div className="flex w-full min-w-0 flex-col items-center gap-1">
            <h2 className="max-w-full wrap-break-word text-center font-google text-xl font-medium sm:text-2xl">
              {product.name}
            </h2>

            <span className="w-full wrap-break-word text-center font-google text-sm text-[#929292] sm:text-base">
              {product.description}
            </span>

            <span className="mt-1 font-google text-sm text-[#929292] sm:text-base">
              Valor:{" "}
              {Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <div className="min-w-0 flex-1">
            <ButtonCancel
              onClick={onClose}
              text="Cancelar"
            />
          </div>

          <div className="min-w-0 flex-1">
            <Button
              onClick={handleDelete}
              text={deleting ? "Deletando..." : "Deletar Produto"}
              disabled={deleting}
            />
          </div>
        </div>
      </div>
    </section>
  );
}