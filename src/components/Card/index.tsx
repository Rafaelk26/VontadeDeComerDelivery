
"use client";

import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";

// Components
import { Button } from "../Button";

// Context
import { cartContext } from "@/context/Cart/useCart";

// Type
import type { Product } from "@/types/Products";

type CardProps = {
  product: Product;
};

export function Card({ product }: CardProps) {
  const context = React.useContext(cartContext);

  if (!context) {
    throw new Error("Item precisa estar no context");
  }

  const { addItemCart } = context;
  const [quantity, setQuantity] = React.useState(0);

  function addList() {
    setQuantity((current) => current + 1);
  }

  function delList() {
    if (quantity <= 0) {
      toast.error("Não é possível diminuir o valor");
      return;
    }

    setQuantity((current) => current - 1);
  }

  function handleAddCart() {
    if (quantity <= 0) {
      toast.error("Selecione pelo menos uma unidade");
      return;
    }

    addItemCart({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      photo: product.photo,
      quantity,
      subtotal: Number(product.price) * quantity,
    });
  }

  return (
    <div className="w-full h-full min-w-0 border-2 border-[#505050] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col shrink-0">

      {/* IMAGEM */}
      <Image
        alt={product.name}
        src={product.photo}
        width={500}
        height={300}
        className="w-full h-44 sm:h-44 md:h-44 lg:h-52 object-cover"
      />

      <div className="w-full flex flex-col flex-1">

        {/* CONTEÚDO */}
        <div className="w-full px-2.5 pt-6 sm:px-3 sm:pt-5 md:px-4 md:pt-6 mb-3 flex flex-col gap-2 sm:gap-3">

          {/* CATEGORIA */}
          <div className="w-max max-w-full bg-[#1D1D1D] border-[0.5px] border-[#666666] py-1 px-2 rounded">
            <span className="font-google font-light text-xs sm:text-sm truncate">
              {product.category}
            </span>
          </div>

          {/* NOME */}
          <h1 className="font-google font-bold text-xl leading-tight sm:text-xl md:text-2xl md:leading-6 line-clamp-2">
            {product.name}
          </h1>

          {/* DESCRIÇÃO */}
          <span className="font-google font-light text-xs sm:text-sm md:text-base text-[#C2C2C2] line-clamp-3">
            {product.description}
          </span>

          {/* PREÇO E QUANTIDADE */}
          <div className="w-full flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">

            {/* PREÇO */}
            <div className="flex flex-col gap-0">
              <h1 className="font-google font-bold text-2xl sm:text-2xl md:text-3xl text-[#F97318]">
                R$ {Number(product.price).toFixed(2).replace(".", ",")}
              </h1>

              <span className="font-google font-light text-md sm:text-sm md:text-md">
                {product.size}
              </span>
            </div>

            {/* QUANTIDADE */}
            <div className="w-28 sm:w-auto flex justify-between sm:justify-center gap-4 border border-[#505050] items-center py-1 px-3 rounded-md">
              <button
                onClick={delList}
                className="font-google font-semibold text-xl sm:text-2xl hover:cursor-pointer"
              >-</button>

              <span className="font-google font-bold text-sm sm:text-base">
                {quantity}
              </span>

              <button
                onClick={addList}
                className="font-google font-semibold text-xl sm:text-2xl hover:cursor-pointer"
              >+</button>
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <div className="w-full flex justify-center mt-4 px-2.5 pb-3 sm:px-3 sm:pb-5 md:px-4 md:pb-6">
          <div className="w-full">
            <Button
              onClick={handleAddCart}
              text="Adicionar ao carrinho"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
