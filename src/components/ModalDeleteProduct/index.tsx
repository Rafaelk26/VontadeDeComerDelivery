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

export function ModalDeleteProduct({ product, onClose, onDelete }: ModalDeleteProductProps){
  const [deleting, setDeleting] = useState(false);

  
  async function handleDelete(){
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
      className="fixed inset-0 z-50 flex items-center justify-center
      overflow-y-auto bg-black/90 p-4"
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
        className="my-auto h-max max-h-[95vh] w-full max-w-lg
        overflow-y-auto rounded-xl border border-[#747474]
        bg-[#0C0C0C] p-5"
      >
        <h1
          id="delete-product-title"
          className="font-google text-xl font-medium"
        >
          Deseja deletar esse produto?
        </h1>

        <div className="my-16 flex flex-col items-center gap-3">
          <Image
            className="h-12 w-12 rounded-md border border-[#747474] object-cover"
            width={100}
            height={100}
            src={product.photo}
            alt={product.name}
            unoptimized
          />

          <div className="flex w-full min-w-0 flex-col items-center gap-1">
            <h2 className="truncate font-google text-2xl font-medium">
              {product.name}
            </h2>

            <span className="w-11/12 truncate text-center font-google text-base text-[#929292]">
              {product.description}
            </span>

            <span className="truncate font-google text-base text-[#929292]">
              Valor:{" "}
              {Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <ButtonCancel
            onClick={onClose}
            text="Cancelar"
          />

          <Button
            onClick={handleDelete}
            text={deleting ? "Deletando..." : "Deletar Produto"}
            disabled={deleting}
          />
        </div>
      </div>
    </section>
  );
}
