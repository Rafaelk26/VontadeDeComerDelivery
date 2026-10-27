"use client";
import React from "react";
import Image from "next/image";
import { IoMdCart, IoIosLock } from "react-icons/io";
import { FaPenNib } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { CiCreditCard1 } from "react-icons/ci";
import { FaPix } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";

// Components
import { Header } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";
import { Footer } from "@/components/Footer";
import { CardItemCart } from "@/components/CardItemCart";
import { Button } from "@/components/Button";

// Function
import { formatProductsToWhatsApp } from "@/function/formatProductsToWhatsApp";

// Context
import { cartContext } from "@/context/Cart/useCart";

// Assets
import Fundo from "../../../public/Background Carrinho.png";
import { toast } from "react-toastify";

export default function Carrinho(){

    const context = React.useContext(cartContext);
    if (!context){
        throw new Error("Item precisa estar no CartProvider.");
    }
    const { cart, removeItemCart, isLoaded } = context;
    const [ description, setDescription ] = React.useState("Nenhuma observação.");
    const [ methodPay, setMethodPay ] = React.useState("");
    
    // FRETE
    const totalItems = React.useMemo(()=> {
        return cart.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
    }, [cart]);

    const freteGratis = totalItems >= 5;
    const freteCalc = totalItems === 0 || freteGratis ? 0 : 5;
    
    // SUBTOTAL
    const subtotal = React.useMemo(()=> {
        return cart.reduce((acc, item) => acc + item.subtotal, 0);
    }, [cart]);

    // TOTAL
    const total = subtotal + freteCalc;


    function sendOrderToWhatsApp(){
        if(cart.length === 0){
            toast.error("Adicione produtos ao carrinho antes de finalizar.");
            return;
        }

        if(!methodPay){
            toast.warning("Selecione uma forma de pagamento.");
            return;
        }

        const itemsQuantity = cart.reduce((acc, item) => acc + Number(item.quantity || 0), 0);

        const message = formatProductsToWhatsApp({ cart, description, itemsQuantity, subtotal, shipping: freteCalc, methodoPayment: methodPay, total });

        const companyWhatsApp = "5512981960559";

        const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    if(!isLoaded){
        return <div>Carregando carrinho...</div>;
    }   

    return(
        <main className="w-full">
            {/* BACKGROUND AND TITLE */}
            <div className="relative mt-16">
                <Image
                 src={Fundo}
                 alt="Fundo Home"
                 quality={100}
                 className="w-full object-cover h-44"
                />

                <Wrapper>
                    <div className="absolute z-50 top-12 flex gap-2 items-center ps-10">
                        <IoMdCart size={48} color="#F97318" />
                        <div className="">
                            <h1 className="font-google font-bold text-5xl text-white">
                                Meu carrinho
                            </h1>
                            <span className="font-google font-light text-md">
                                Veja os itens adicionados no carrinho antes de finalizar o seu pedido.
                            </span>
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
                                     removeItemCart={removeItemCart}
                                     subtotal={i.subtotal}
                                    />
                            )   )
                            ):(
                                <div className="w-full h-full flex flex-col justify-center">
                                    <span className="text-center font-google">
                                        Nenhum produto adicionado.
                                    </span>
                                </div>
                            )}
                        </div>
                        {cart.length > 0 ? (
                            <div className="p-6 h-96 flex flex-col gap-4">
                                <div className="flex gap-2 items-center">
                                    <FaPenNib size={20} color="#fff" />
                                    <span className="font-google font-light text-lg">
                                        Observações (opcional)
                                    </span>
                                </div>

                                <textarea 
                                placeholder="Ex: Sem carne seca, bem separado, etc..."
                                className="w-full h-full border border-[rgb(36,36,36)] rounded-xl p-2 font-google 
                                hover:border-[#515151] focus:border-[#515151]"
                                name="observacao"
                                onChange={(e)=> setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        ):(
                            <></>
                        )}
                    </section>
                    
                    {/* PRICE CART AND METHOD PAYMENT */}
                    <section className="w-full max-w-5/12 h-screen flex flex-col gap-10">
                        {/* PRICE */}
                        <div className="w-full p-6 border border-[#747474] rounded-lg">
                            <div className="flex gap-2 items-center">
                                <FiShoppingBag color="#F97318" size={20} />
                                <h1 className="font-google text-xl">
                                    Resumo do pedido
                                </h1>
                            </div>

                            <div className="w-full divide-y divide-[#505050]">
                                {/* ITENS */}
                                <div className="flex items-center justify-between py-3 mt-6">
                                    <h1 className="font-google font-light">
                                        {cart.length} {cart.length === 1 ? "Item" : "Itens"}
                                    </h1>
                                </div>
                                {/* FRETE */}
                                <div className="flex items-center justify-between py-3">
                                    <h1 className="font-google font-light">
                                        Frete
                                    </h1>
                                    <div className="flex gap-2 items-center">
                                        {freteGratis && (
                                            <span className="font-google font-light text-sm line-through text-[#D5D2D2]">
                                                R$ 5,00
                                            </span>
                                        )}

                                        <span className="font-google font-light text-xl">
                                            {freteCalc.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
                                        </span>
                                    </div>
                                </div>
                                {/* SUBTOTAL */}
                                <div className="flex items-center justify-between py-3">
                                    <h1 className="font-google font-light">
                                        Subtotal
                                    </h1>
                                    <span className="font-google font-light text-xl">
                                        {subtotal.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
                                    </span>
                                </div>
                                {/* TOTAL */}
                                <div className="flex items-center justify-between py-3">
                                    <h1 className="font-google font-medium">Total</h1>
                                    <span className="font-google font-light text-2xl text-[#F97318]">
                                        {total.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* METHOD PAYMENT */}
                        <div className="w-full h-full p-6 border border-[#747474] rounded-lg">
                            <div className="flex gap-2 items-center">
                                <FiShoppingBag color="#F97318" size={20} />
                                <h1 className="font-google text-xl">
                                    Forma de pagamento
                                </h1>
                            </div>

                            <div className="w-full">
                                {/* DÉBITO */}
                                <label className="flex items-center justify-between p-3.5 border border-[#747474] rounded-xl mt-8 cursor-pointer">
                                    <div className="flex gap-2">
                                        <CiCreditCard1 color="#fff" size={24} />
                                        <h1 className="font-google font-light">
                                            Cartão de débito
                                        </h1>
                                    </div>
                                    <input 
                                     className="cursor-pointer"
                                     type="radio" 
                                     name="Option" 
                                     onClick={()=> setMethodPay("debito")}
                                    />
                                </label>
                                {/* CRÉDITO */}
                                <label className="group flex items-center justify-between p-3.5 border border-[#747474] rounded-xl mt-6 cursor-pointer">
                                    <div className="flex gap-2">
                                        <CiCreditCard1 color="#fff" size={24} />
                                        <h1 className="font-google font-light">
                                            Cartão de crédito
                                        </h1>
                                    </div>
                                    <input 
                                     className="cursor-pointer group"
                                     type="radio" 
                                     name="Option" 
                                     onClick={()=> setMethodPay("credito")}
                                    />
                                </label>
                                {/* PIX */}
                                <label className="flex items-center justify-between p-3.5 border border-[#747474] rounded-xl mt-6 cursor-pointer">
                                    <div className="flex gap-2">
                                        <FaPix color="#fff" size={24} />
                                        <h1 className="font-google font-light">
                                            Pix
                                        </h1>
                                    </div>
                                    <input 
                                     className="cursor-pointer"
                                     type="radio" 
                                     name="Option" 
                                     onClick={()=> setMethodPay("pix")}
                                    />
                                </label>
                                {/* DINHEIRO */}
                                <label className="flex items-center justify-between p-3.5 border border-[#747474] rounded-xl mt-6 cursor-pointer">
                                    <div className="flex gap-2">
                                        <FaMoneyBills color="#fff" size={24} />
                                        <h1 className="font-google font-light">
                                            Dinheiro
                                        </h1>
                                    </div>
                                    <input 
                                     className="cursor-pointer"
                                     type="radio" 
                                     name="Option" 
                                     onClick={()=> setMethodPay("dinheiro")}
                                    />
                                </label>
                            </div>


                            {/* FINALIZAR PEDIDO */}
                            <div className="w-full mt-10 flex flex-col items-center">
                                <Button 
                                 onClick={sendOrderToWhatsApp}
                                 text="Finalizar compra" 
                                />

                                <div className="w-72 flex justify-center items-center mt-4">
                                    <IoIosLock size={24} color="#9F9F9F" />
                                    <span className="font-google font-light text-sm text-[#9F9F9F] text-center">
                                        Você será redirecionado para o whatsapp para finalizar o seu pedido.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </Wrapper>
            <Footer />
        </main>
    )
}