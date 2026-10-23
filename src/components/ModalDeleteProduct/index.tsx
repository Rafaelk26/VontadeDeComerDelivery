"use client";
import Image from "next/image";

// Components
import { Button, ButtonCancel } from "@/components/Button";

// Data
import { Product } from "@/types/Products";

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
          Deseja deletar esse produto?
        </h1>

        <div className="flex flex-col items-center gap-3 my-16">
          <Image 
            className="h-12 w-12 object-cover border border-[#747474] rounded-md"
            width={1000}
            height={1000}
            src={product.image}
            alt={product.name}
          />

          <div className="min-w-0 w-full flex flex-col items-center gap-1">
            <h1 className="truncate font-google font-medium text-2xl">
              {product.name}
            </h1>
            <span className="truncate w-11/12 font-google text-base text-[#929292] text-center">{product.description}</span>
            <span className="truncate font-google text-base text-[#929292]">Valor: {Number(product.price).toLocaleString("pt-br", {currency: "BRL", style:"currency"})}</span>
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
            text="Deletar Produto"
          />
        </div>
      </div>
    </section>
  );
}
