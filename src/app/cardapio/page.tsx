"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import { Header } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";
import { InputSearch } from "@/components/Input";
import { MenuModal } from "@/components/MenuModal";
import { OptionCategory } from "@/components/OptionCategory";
import { Footer } from "@/components/Footer";

// Data
import { categories } from "@/data/Categories";

// Assets
import Flyer from "../../../public/Flyer.png";
import Fundo from "../../../public/Background Cardapio.png";
import Banner from "../../../public/Banner Cardapio.png";

export default function Cardapio(){

    const [activeCategory, setActiveCategory] = React.useState<string>("1");
    const [search, setSearch] = React.useState<string>("");
    
    const selectedCategory = categories.find(
        (category) => category.id === activeCategory
    );

    function changeStatus(id: string){
        setActiveCategory(id);
    }


    return(
        <>
            <main className="relative min-h-screen overflow-hidden">
                {/* BACKGROUND */}
                <Image
                 src={Fundo}
                 alt="Fundo Home"
                 fill
                 priority
                 quality={100}
                 className="absolute -z-20 object-fill"
                />
        
                <Header />
                
                <Wrapper>
                    <section className="relative flex min-h-[calc(80vh)] items-center">
                        {/* CONTENT */}
                        <div className="relative z-10 w-full max-w-162.5 pb-10 ps-10 mt-52">
                            <h4 className="font-google text-md italic text-white">
                                Escolha sua opção em
                            </h4>
            
                            <div className="mt-3 flex flex-col">
                            <h1 className="font-google text-5xl font-regular leading-[0.95] text-white md:text-7xl">
                                Nosso
                            </h1>
            
                            <h1 className="font-google text-5xl font-medium leading-[0.95] text-[#F97318] md:text-7xl">
                                Cardápio
                            </h1>
                            </div>
            
                            <span className="mt-5 block font-google text-base font-light leading-tight text-white md:text-xl">
                                Sabor, qualidade, e aquele
                                <br />
                                jeitinho carinhoso que você ama!
                            </span>
                        </div>
            
                        {/* FLYER */}
                        <div className="absolute bottom-[10%] right-[5%] z-20 md:right-[8%] lg:right-[4%]">
                            <Link href={"/cardapio"}>
                            <Image
                             src={Flyer}
                             alt="Flyer Vontade de Comer"
                             priority
                             quality={100}
                             className="w-64 object-contain rotate-[-14deg] transition-transform duration-300
                             hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_10px_25px_rgba(253, 252, 252, 0.6)]"
                            />
                            </Link>
                        </div>
                    </section>
                </Wrapper>
            </main>

            <main className="w-full max-w-full min-[1920px]:max-w-7xl min-[1920px]:mx-auto">
                <div className="w-full flex">
                    {/* MENU & BANNER */}
                    <article className="w-full max-w-1/4 border-r border-r-[#818181] p-4">
                        <h3 className="font-google font-light text-xl mt-6">Filtrar categoria</h3>

                        <div className="w-full flex flex-col mt-8">

                            {/* MENU */}
                            <div className="border border-[#353535] rounded-xl">
                                <ul className="w-full divide-y divide-[#505050] flex flex-col rounded-xl">
                                    <OptionCategory
                                     id="1"
                                     nameCategory="Todos os produtos"
                                     menuActive={activeCategory === "1"}
                                     onActive={() => changeStatus("1")}
                                    />

                                    <OptionCategory
                                     id="2"
                                     nameCategory="Caldos"
                                     menuActive={activeCategory === "2"}
                                     onActive={() => changeStatus("2")}
                                    />

                                    <OptionCategory
                                     id="3"
                                     nameCategory="Marmitas"
                                     menuActive={activeCategory === "3"}
                                     onActive={() => changeStatus("3")}
                                    />

                                    <OptionCategory
                                     id="4"
                                     nameCategory="Sobremesas"
                                     menuActive={activeCategory === "4"}
                                     onActive={() => changeStatus("4")}
                                    />

                                    <OptionCategory
                                     id="5"
                                     nameCategory="Bebidas"
                                     menuActive={activeCategory === "5"}
                                     onActive={() => changeStatus("5")}
                                    />

                                    <OptionCategory
                                     id="6"
                                     nameCategory="Promoções"
                                     menuActive={activeCategory === "6"}
                                     onActive={() => changeStatus("6")}
                                    />
                                </ul>
                            </div>

                            {/* BANNER */}
                            <Image 
                             alt="Banner" 
                             src={Banner}
                             quality={100}
                             className="border rounded-xl mt-20" 
                            />
                        </div>
                    </article>


                    {/* CARDS, INPUTS */}
                    <section className="w-full max-w-3/4 p-4 flex flex-col">

                        {/* INPUT */}
                        <InputSearch 
                         type="text" 
                         placeholder="Buscar no cardápio..." 
                         value={search}
                         onChange={(e)=> setSearch(e.target.value)}
                        />

                        {/* CARDS MODAL */}
                        <div className="w-full mt-12">
                            <MenuModal 
                             name={selectedCategory?.name ?? "Todos os produtos"} 
                             search={search}
                             />
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}