"use client"
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";

// Components
import { Button } from "../Button";

// Context
import { cartContext } from '@/context/Cart/useCart';

// Type
import type { Product } from "@/data/Products";

type CardProps = {
  product: Product;
};

export function Card({ product }: CardProps){

    const context = React.useContext(cartContext);
    
    if(!context){
        throw new Error ("Item precisa estar no context");
    }

    const { cart, addItemCart } = context;
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
      price: product.price,
      quantity,
    });
  }

  return (
    <div className="w-full h-full border-2 border-[#505050] rounded-2xl overflow-hidden flex flex-col shrink-0">
        <Image
         alt={product.name}
         src={product.image}
         width={500}
         height={300}
         className="w-full h-52 object-cover"
        />

        <div className="w-full flex flex-col flex-1">
            {/* CONTEÚDO */}
            <div className="w-full px-4 pt-6 mb-3 flex flex-col gap-3">
                <div className="w-max bg-[#1D1D1D] border-[0.5px] border-[#666666] py-1 px-2 rounded">
                    <span className="font-google font-light text-sm">
                        {product.category}
                    </span>
                </div>

                <h1 className="font-google font-bold text-2xl/6">
                    {product.name}
                </h1>

                <span className="font-google font-light text-[#C2C2C2]">
                    {product.description}
                </span>

                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-0">
                        <h1 className="font-google font-bold text-3xl text-[#F97318]">
                            R$ {Number(product.price).toFixed(2).replace(".", ",")}
                        </h1>

                        <span className="font-google font-light text-md">
                            {product.size}
                        </span>
                    </div>

                    <div className="flex gap-6 border border-[#505050] items-center py-1 px-2 rounded-md">
                    <button
                     onClick={delList}
                     className="font-google font-semibold text-2xl hover:cursor-pointer">
                        -
                    </button>

                    <span className="font-google font-bold">
                        {quantity}
                    </span>

                    <button
                     onClick={addList}
                     className="font-google font-semibold text-2xl hover:cursor-pointer">
                        +
                    </button>
                    </div>
                </div>
            </div>

            {/* BOTÃO */}
            <div className="w-full flex justify-center mt-auto px-4 pb-6">
            <Button
                onClick={handleAddCart}
                text="Adicionar ao carrinho"
            />
            </div>

        </div>
        </div>
  );
}