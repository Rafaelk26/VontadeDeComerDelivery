
"use client";

import React from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

// Types and Context
import { cartContext, itemCartProps } from "@/context/Cart/useCart";

interface removeItemCartProps extends itemCartProps {
  removeItemCart: (id: string) => void;
}

export function CardItemCart({ removeItemCart, id, name, description, price, category, quantity, photo, subtotal}: removeItemCartProps){
  const context = React.useContext(cartContext);

  if (!context) {
    throw new Error("CardItemCart precisa estar dentro de CartProvider.");
  }

  const { updateQuantity } = context;

  function addList() {
    updateQuantity(id, quantity + 1);
  }

  function delList() {
    if (quantity <= 1) {
      removeItemCart(id);
      return;
    }

    updateQuantity(id, quantity - 1);
  }

  return (
    <div
      key={id}
      className="w-full flex flex-col gap-3 pb-4 sm:gap-4 md:flex-row md:justify-between md:gap-0 md:first:pb-4 md:last:pb-0"
    >
      {/* INFORMAÇÕES DO PRODUTO */}
      <div className="w-full min-w-0 flex gap-3 sm:gap-4 md:max-w-10/12 md:items-center">

        {/* IMAGEM */}
        <div className="w-24 h-24 shrink-0 sm:w-32 sm:h-32 md:w-44 md:h-44">
          <Image
            alt={name}
            src={photo}
            className="w-full h-full rounded-lg object-cover border border-[#5D5D5D]"
            width={1000}
            height={1000}
          />
        </div>

        {/* CONTEÚDO */}
        <div className="min-w-0 flex flex-1 flex-col justify-between">

          <div>
            <h1 className="font-google font-bold text-base leading-tight wrap-break-word sm:text-xl md:text-3xl md:leading-7">
              {name}
            </h1>

            <h6 className="font-google font-light text-xs text-[#C2C2C2] mt-1 sm:text-sm md:mt-2">
              {description}
            </h6>

            <h2 className="font-google font-medium text-xl mt-2 text-[#F97318] sm:text-2xl md:text-3xl">
              {Number(price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
          </div>

          {/* QUANTIDADE E REMOVER */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-3">

            {/* QUANTIDADE */}
            <div className="flex gap-4 sm:gap-6 border border-[#505050] items-center py-1 px-2 rounded-md">

              <button
                onClick={delList}
                className="font-google font-semibold text-xl sm:text-2xl hover:cursor-pointer"
              >
                -
              </button>

              <span className="font-google font-bold text-sm sm:text-base">
                {quantity}
              </span>

              <button
                onClick={addList}
                className="font-google font-semibold text-xl sm:text-2xl hover:cursor-pointer"
              >
                +
              </button>

            </div>

            {/* REMOVER */}
            <button
              onClick={() => removeItemCart(id)}
              className="flex shrink-0 gap-1.5 items-center cursor-pointer me-0 md:me-16"
            >
              <FaRegTrashAlt color="#fff" size={16} />

              <span className="font-google text-xs whitespace-nowrap sm:text-sm">
                Remover
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORIA E SUBTOTAL */}
      <div className="w-full flex flex-row justify-between items-center gap-3 md:w-full md:max-w-2/12 md:flex-col md:items-end md:justify-between">

        <span className="max-w-[55%] truncate font-google font-light text-xs sm:text-sm bg-[#1D1D1D] border border-[#666666] py-1 px-2 rounded-lg">
          {category}
        </span>

        <div className="text-end">
          <h1 className="font-google text-xs sm:text-sm md:text-md">
            Subtotal
          </h1>

          <span className="font-google font-medium text-base sm:text-lg md:text-xl whitespace-nowrap">
            {subtotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

      </div>
    </div>
  );
}
