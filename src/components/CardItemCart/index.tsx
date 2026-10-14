"use client";
import React from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

// Types and Context
import { cartContext, itemCartProps } from "@/context/Cart/useCart";
interface removeItemCartProps extends itemCartProps{
    removeItemCart: (id: string)=> void;
}

export function CardItemCart({removeItemCart, id, name, description, price, category, quantity, photo, subtotal}: removeItemCartProps){
        
    const context = React.useContext(cartContext);

        if(!context){
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


    return(
        <>
            <div
            key={id}
            className="w-full flex justify-between first:pb-4 pb-4 last:pb-0">
                <div className="w-full max-w-10/12 flex gap-2 items-center">
                    <div className="h-44 w-44 shrink-0">
                        <Image 
                         alt={name}
                         src={photo}
                         className="w-full h-full rounded-lg object-cover border border-[#5D5D5D]"
                         width={1000}
                         height={1000}
                        />
                    </div>
                    <div className="flex flex-col justify-between">
                        
                        <h1 className="font-google font-bold text-3xl leading-7">{name}</h1>
                    
                        <h6 className="font-google font-light text-sm text-[#C2C2C2] mt-2">{`${description}`}</h6>
                        
                        <h2 className="font-google font-medium text-3xl mt-2 text-[#F97318]">{`${Number(price).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`}</h2>

                        {/* Quantity and Button Remove */}
                        <div className="w-full flex justify-between mt-2">
                            <div className="flex gap-6 border border-[#505050] items-center py-1 px-2 rounded-md">
                                <button
                                onClick={()=> delList()}
                                className="font-google font-semibold text-2xl hover:cursor-pointer">-</button>

                                <span className="font-google font-bold">{quantity}</span>

                                <button
                                onClick={()=> addList()}
                                className="font-google font-semibold text-2xl hover:cursor-pointer">+</button>
                            </div>

                            <button 
                            onClick={()=> removeItemCart(id)}
                            className="flex shrink-0 gap-1.5 items-center cursor-pointer me-16">
                                <FaRegTrashAlt color="#fff" size={20} />
                                <span className="font-google whitespace-nowrap">Remover</span>
                            </button>
                        </div>
                        
                    </div>
                </div>
                <div className="w-full max-w-2/12 flex flex-col justify-between items-end">
                    <span className="font-google font-light bg-[#1D1D1D] border border-[#666666] py-1 px-2 rounded-lg">{category}</span>
                    <div>
                        <h1 className="text-end font-google text-md">Subtotal</h1>
                        <span className="font-google font-medium text-xl">{subtotal.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</span>
                    </div>
                </div>
            </div>
        </>
    )
}