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
import { criarPedidoWhatsApp } from "@/function/createOrderToWhatsApp";
import { formatProductsToWhatsApp } from "@/function/formatProductsToWhatsApp";

// Context
import { cartContext } from "@/context/Cart/useCart";

// Assets
import Fundo from "../../../public/Background Carrinho.png";
import { toast } from "react-toastify";

export default function Carrinho() {
    const context = React.useContext(cartContext);

    if (!context) {
        throw new Error("Item precisa estar no CartProvider.");
    }

    const { cart, removeItemCart, isLoaded } = context;
    const [description, setDescription] = React.useState("Nenhuma observação.");
    const [methodPay, setMethodPay] = React.useState("");

    // FRETE
    const totalItems = React.useMemo(() => {
        return cart.reduce((acc, item) => acc + Number(item.quantity || 0), 0);
    }, [cart]);

    const freteGratis = totalItems >= 5;
    const freteCalc = totalItems === 0 || freteGratis ? 0 : 5;

    // SUBTOTAL
    const subtotal = React.useMemo(() => {
        return cart.reduce((acc, item) => acc + item.subtotal, 0);
    }, [cart]);

    // TOTAL
    const total = subtotal + freteCalc;

    async function sendOrderToWhatsApp() {
        if (cart.length === 0) {
            toast.error("Adicione produtos ao carrinho antes de finalizar.");
            return;
        }

        if (!methodPay) {
            toast.warning("Selecione uma forma de pagamento.");
            return;
        }

        try {
            const result = await criarPedidoWhatsApp({
                cart: cart.map((item) => ({
                    id: item.id,
                    quantity: Number(item.quantity),
                })),
                description,
                methodoPayment: methodPay,
            });

            const message = formatProductsToWhatsApp(result);
            const companyWhatsApp = "5512981960559";
            const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            toast.success(`Pedido ${result.order.codigo} registrado!`);
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Não foi possível registrar o pedido."
            );
        }
    }

    if (!isLoaded) {
        return <div>Carregando carrinho...</div>;
    }

    return (
        <main className="w-full">
            {/* BACKGROUND AND TITLE */}
            <div className="relative mt-16">
                <Image
                    src={Fundo}
                    alt="Fundo Home"
                    quality={100}
                    className="h-36 w-full object-cover md:h-44"
                />

                <Wrapper>
                    <div className="absolute z-50 top-8 md:top-12 flex gap-2 items-center px-4 md:ps-10">
                        <IoMdCart size={36} className="shrink-0 md:w-12! md:h-12!" color="#F97318" />
                        <div>
                            <h1 className="font-google font-bold text-3xl md:text-5xl text-white">
                                Meu carrinho
                            </h1>
                            <span className="font-google font-light text-md md:text-md">
                                Veja os itens adicionados no carrinho antes de finalizar o seu pedido.
                            </span>
                        </div>
                    </div>
                </Wrapper>
            </div>

            <Header />

            <Wrapper>
                <section className="w-full flex flex-col md:flex-row gap-6 px-4 mb-10 md:px-10 mt-6 md:mt-10 h-auto md:h-screen">
                    {/* ITEMS CART */}
                    <section className="w-full md:max-w-7/12 flex flex-col border border-[#282828] rounded-xl min-h-75 md:min-h-0">
                        {/* ITEMS */}
                        <div className="w-full px-4 py-5 md:px-6 md:py-8 flex flex-col gap-8 divide-y divide-[#505050] h-auto md:h-full md:overflow-y-auto">
                            {cart.length > 0 ? (
                                cart.map((i, index) => (
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
                                ))
                            ) : (
                                <div className="w-full h-full flex flex-col justify-center py-10">
                                    <span className="text-center font-google">
                                        Nenhum produto adicionado.
                                    </span>
                                </div>
                            )}
                        </div>

                        {cart.length > 0 ? (
                            <div className="p-4 md:p-6 h-48 md:h-96 flex flex-col gap-4">
                                <div className="flex gap-2 items-center">
                                    <FaPenNib size={20} color="#fff" />
                                    <span className="font-google font-light text-base md:text-lg">
                                        Observações (opcional)
                                    </span>
                                </div>

                                <textarea
                                    placeholder="Ex: Sem carne seca, bem separado, etc..."
                                    className="w-full flex-1 min-h-24 md:min-h-0 border border-[rgb(36,36,36)] rounded-xl p-2 font-google hover:border-[#515151] focus:border-[#515151]"
                                    name="observacao"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </section>

                    {/* PRICE CART AND METHOD PAYMENT */}
                    <section className="w-full md:max-w-5/12 h-auto md:h-screen flex flex-col gap-6 md:gap-10">
                        {/* PRICE */}
                        <div className="w-full p-4 md:p-6 border border-[#747474] rounded-lg">
                            <div className="flex gap-2 items-center">
                                <FiShoppingBag color="#F97318" size={20} />
                                <h1 className="font-google text-lg md:text-xl">
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
                                    <h1 className="font-google font-light">Frete</h1>
                                    <div className="flex gap-2 items-center">
                                        {freteGratis && (
                                            <span className="font-google font-light text-sm line-through text-[#D5D2D2]">
                                                R$ 5,00
                                            </span>
                                        )}

                                        <span className="font-google font-light text-xl">
                                            {freteCalc.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* SUBTOTAL */}
                                <div className="flex items-center justify-between py-3">
                                    <h1 className="font-google font-light">Subtotal</h1>
                                    <span className="font-google font-light text-xl">
                                        {subtotal.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </span>
                                </div>

                                {/* TOTAL */}
                                <div className="flex items-center justify-between py-3">
                                    <h1 className="font-google font-medium">Total</h1>
                                    <span className="font-google font-light text-2xl text-[#F97318]">
                                        {total.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* METHOD PAYMENT */}
                        <div className="w-full h-auto md:h-full p-4 md:p-6 border border-[#747474] rounded-lg">
                            <div className="flex gap-2 items-center">
                                <FiShoppingBag color="#F97318" size={20} />
                                <h1 className="font-google text-lg md:text-xl">
                                    Forma de pagamento
                                </h1>
                            </div>

                            <div className="w-full">
                                {/* DÉBITO */}
                                <label className="flex items-center justify-between p-3 md:p-3.5 border border-[#747474] rounded-xl mt-6 md:mt-8 cursor-pointer">
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
                                        onClick={() => setMethodPay("debito")}
                                    />
                                </label>

                                {/* CRÉDITO */}
                                <label className="group flex items-center justify-between p-3 md:p-3.5 border border-[#747474] rounded-xl mt-4 md:mt-6 cursor-pointer">
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
                                        onClick={() => setMethodPay("credito")}
                                    />
                                </label>

                                {/* PIX */}
                                <label className="flex items-center justify-between p-3 md:p-3.5 border border-[#747474] rounded-xl mt-4 md:mt-6 cursor-pointer">
                                    <div className="flex gap-2">
                                        <FaPix color="#fff" size={24} />
                                        <h1 className="font-google font-light">Pix</h1>
                                    </div>
                                    <input
                                        className="cursor-pointer"
                                        type="radio"
                                        name="Option"
                                        onClick={() => setMethodPay("pix")}
                                    />
                                </label>

                                {/* DINHEIRO */}
                                <label className="flex items-center justify-between p-3 md:p-3.5 border border-[#747474] rounded-xl mt-4 md:mt-6 cursor-pointer">
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
                                        onClick={() => setMethodPay("dinheiro")}
                                    />
                                </label>
                            </div>

                            {/* FINALIZAR PEDIDO */}
                            <div className="w-full mt-8 md:mt-10 flex flex-col items-center">
                                <Button
                                    onClick={sendOrderToWhatsApp}
                                    text="Finalizar compra"
                                />

                                <div className="w-full max-w-72 flex justify-center items-center mt-4">
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
    );
}
