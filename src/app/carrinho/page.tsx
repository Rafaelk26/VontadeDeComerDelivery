import Image from "next/image";

// Components
import { Header } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";

// Assets
import Fundo from "../../../public/Background Carrinho.png";
import { IoMdCart } from "react-icons/io";
import { Footer } from "@/components/Footer";

export default function Carrinho(){
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
                    <section className="w-full max-w-7/12 border border-[#282828]">
                        {/* ITEMS */}
                        <div className="w-full">
                            <span>div 1</span>
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