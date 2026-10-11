"use client";
import React from "react";
import Image from "next/image";
import { IoMdCart } from "react-icons/io";
import { FaPenNib } from "react-icons/fa";

// Components
import { Header } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";
import { Footer } from "@/components/Footer";
import { CardItemCart } from "@/components/CardItemCart";

// Context
import { cartContext } from "@/context/Cart/useCart";

// Assets
import Fundo from "../../../public/Background Carrinho.png";

export default function Carrinho(){

    const context = React.useContext(cartContext);
    if (!context){
        throw new Error("Item precisa estar no CartProvider.");
    }
    const { cart, removeItemCart } = context;

    return(
        <main className="w-full">
            {/* BACKGROUND AND TITLE */}
            <div className="relative mt-16">
                <Image
                 src={Fundo}
                 alt="Fundo Home"
                 quality={100}
                 className="w-full object-cover h-36"
                />

                <Wrapper>
                    <div className="absolute z-50 top-8 flex gap-2 items-center ps-10">
                        <IoMdCart size={48} color="#F97318" />
                        <div className="">
                            <h1 className="font-google font-bold text-5xl text-white">Meu carrinho</h1>
                            <span className="font-google font-light text-md">Veja os itens adicionados no carrinho antes de finalizar o seu pedido.</span>
                        </div>
                    </div>
                </Wrapper>
            </div>
    
            <Header />
            
            <Wrapper>
                <section className="w-full flex gap-6 px-10 mt-10 h-screen">
                    {/* ITEMS CART */}
                    <section className="w-full max-w-7/12 flex flex-col border border-[#282828] rounded-xl">
                        {/* ITEMS */}
                        <div className="w-full px-6 py-8 flex flex-col gap-8 divide-y divide-[#505050] h-full overflow-y-auto">
                            {cart.length > 0 ? (
                                cart.map((i, index)=> (
                                    <CardItemCart
                                     key={index}
                                     id={i.id}
                                     name={i.name}
                                     category={i.category}
                                     description={i.description}
                                     price={i.price}
                                     quantity={i.quantity}
                                     photo={i.photo}
                                     item={i}
                                     removeItemCart={removeItemCart}
                                    />
                            )   )
                            ):(
                                <span className="text-center font-google">Nenhum produto adicionado.</span>
                            )}
                        </div>
                        <div className="p-6 h-96 flex flex-col gap-4">
                            <div className="flex gap-2 items-center">
                                <FaPenNib size={20} color="#fff" />
                                <span className="font-google font-light text-lg">Observações (opcional)</span>
                            </div>

                            <textarea 
                            placeholder="Ex: Sem carne seca, bem separado, etc..."
                            className="w-full h-full border border-[#242424] rounded-xl p-2 font-google 
                            hover:border-[#515151] focus:border-[#515151]"
                            name="observacao"></textarea>
                        </div>
                    </section>
                    
                    {/* PRICE CART AND METHOD PAYMENT */}
                    <section className="w-full max-w-5/12 h-screen flex flex-col gap-20">
                        {/* PRICE */}
                        <div className="w-full border border-[#747474]">
                            <span>div 2.1</span>
                        </div>

                        {/* METHOD PAYMENT */}
                        <div className="w-full border border-[#747474]">
                            <span>div 2.2</span>
                        </div>
                    </section>
                </section>
            </Wrapper>
            <Footer />
        </main>
    )
}