"use client";
import Image from "next/image";

// Components
import { Button, ButtonCancel } from "@/components/Button";

// Data
import { Product } from "@/data/Products";

type ModalEditProductProps = {
  product: Product;
  onClose: ()=> void;
  onDelete: ()=> void;
};

export function ModalDeleteProduct({ product, onClose, onDelete }: ModalEditProductProps){

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
          Deletar Produto
        </h1>

        <Image 
         className="h-12 w-12 object-cover border border-[#747474]"
         width={1000}
         height={1000}
         src={product.image}
         alt={product.name}
        />

        {/* Botões */}
        <div className="mt-6 flex gap-2">
          <ButtonCancel
            onClick={onClose}
            text="Cancelar"
          />

          <Button
            onClick={onDelete}
            text="Deletar Produto"
          />
        </div>
      </div>
    </section>
  );
}
