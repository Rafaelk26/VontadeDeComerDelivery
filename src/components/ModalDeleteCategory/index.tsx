"use client";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";
import { toast } from "react-toastify";

// Components
import { Button, ButtonCancel } from "@/components/Button";

// Functions
import { handleCategoryDelete } from "@/function/handleCategoryDelete";
import { clearAdminDataCache } from "@/lib/cache/adminCache";

// Types
import type { Category } from "@/types/Categories";

type ModalDeleteCategoryProps = {
  category: Category;
  product: number;
  onClose: () => void;
  onDelete: () => void;
};

export function ModalDeleteCategory({ category, product, onClose, onDelete }: ModalDeleteCategoryProps) {
  
  const [deleting, setDeleting] = useState(false);
  
  async function handleDelete(){
    if (deleting) return;
    if(product > 0){
      toast.warning(
        "Esta categoria possui produtos vinculados. Remova ou transfira os produtos antes de excluí-la.",
        { toastId: `category-has-products-${category.id}` }
      );
      return;
    }
    setDeleting(true);
    try {
      await handleCategoryDelete(category.id);

      clearAdminDataCache();

      // Atualiza a lista sem gerar outra notificação no componente pai
      onDelete();

      toast.success("Categoria excluída com sucesso.", {
        toastId: `delete-category-${category.id}`,
      });

      onClose();
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);

      toast.error("Não foi possível excluir a categoria. Tente novamente.", {
        toastId: `delete-category-error-${category.id}`,
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
        if (event.target === event.currentTarget && !deleting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-category-title"
        className="my-auto h-max max-h-[95vh] w-full max-w-lg
        overflow-y-auto rounded-xl border border-[#747474]
        bg-[#0C0C0C] p-5"
      >
        <h1
          id="delete-category-title"
          className="font-google text-xl font-medium"
        >
          Deseja deletar essa categoria?
        </h1>

        <div className="my-16 flex flex-col items-center gap-3">
          <div className="flex w-full min-w-0 flex-col items-center gap-1">
            <h2 className="truncate font-google text-2xl font-medium">
              {category.name}
            </h2>

            <span className="w-11/12 truncate text-center font-google text-base text-[#929292]">
              {product}{" "}
              {product !== 1
                ? "itens cadastrados na categoria."
                : "item cadastrado na categoria."}
            </span>

            <div className="mt-10 flex w-full flex-col items-center gap-2">
              <IoIosAlert size={36} color="#F97318" />

              <span className="text-center font-google text-base text-white">
                Ao excluir esta categoria, os produtos vinculados precisam
                ser removidos ou transferidos antes da exclusão.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <ButtonCancel
            onClick={onClose}
            text="Cancelar"
          />

          <Button
            onClick={handleDelete}
            text={deleting ? "Excluindo..." : "Deletar Categoria"}
            disabled={deleting}
          />
        </div>
      </div>
    </section>
  );
}
