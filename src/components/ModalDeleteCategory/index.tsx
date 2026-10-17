"use client";
import { IoIosAlert } from "react-icons/io";

// Components
import { Button, ButtonCancel } from "@/components/Button";

// Data
import { Category } from "@/data/Categories";

type ModalDeleteCategoryProps = {
  category: Category;
  product: number;
  onClose: ()=> void;
  onDelete: ()=> void;
};

export function ModalDeleteCategory({ category, product, onClose, onDelete }: ModalDeleteCategoryProps){

  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center
      overflow-y-auto bg-black/90 p-4"
      onMouseDown={(event)=> {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-product-title"
        className="my-auto h-max max-h-[95vh] w-full max-w-lg
        overflow-y-auto rounded-xl border border-[#747474]
        bg-[#0C0C0C] p-5"
      >
        <h1 id="edit-product-title" className="font-google text-xl font-medium">
          Deseja deletar essa categoria?
        </h1>

        <div className="flex flex-col items-center gap-3 my-16">
          <div className="min-w-0 w-full flex flex-col items-center gap-1">
            <h1 className="truncate font-google font-medium text-2xl">
              {category.name}
            </h1>
            <span className="truncate w-11/12 font-google text-base text-[#929292] text-center">{product} {product !== 1 ? "Itens cadastrados na categoria." : "Item cadatrado na categoria."}</span>
          
            <div className="w-full flex flex-col items-center mt-10 gap-2">
                <IoIosAlert size={36} color="#F97318" />
                <span className="font-google text-base text-white text-center">
                    Ao deletar essa categoria, todos os itens cadastrados nesta categoria também serão deletados!
                </span>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="mt-6 flex gap-2">
          <ButtonCancel
            onClick={onClose}
            text="Cancelar"
          />

          <Button
            onClick={onDelete}
            text="Deletar Categoria"
          />
        </div>
      </div>
    </section>
  );
}
