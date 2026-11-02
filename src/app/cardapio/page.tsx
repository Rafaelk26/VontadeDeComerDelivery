
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

// Functions
import { getAllCategories } from "@/function/getAllCategory";

// Type
import { Category } from "@/types/Categories";

// Assets
import Flyer from "../../../public/Flyer.png";
import Fundo from "../../../public/Background Cardapio.png";
import Banner from "../../../public/Banner Cardapio.png";

export default function Cardapio(){

  // PAGE
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const [loadingCategories, setLoadingCategories] = React.useState(true);
  const [categoriesError, setCategoriesError] = React.useState(false);

    React.useEffect(()=> {
        async function loadCategories(){
      try {
        setLoadingCategories(true);
        setCategoriesError(false);

        const data = await getAllCategories();

        if (data) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        setCategoriesError(true);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  const selectedCategory = categories.find(
    (category) => String(category.id) === activeCategory
  );

  function changeStatus(id: string){
    setActiveCategory(id);
  }

  return (
    <>
        {/* HERO / BANNER PRINCIPAL */}
        <main className="relative min-h-max overflow-hidden md:min-h-screen">

            {/* BACKGROUND */}
            <Image
                src={Fundo}
                alt="Fundo Home"
                fill
                priority
                quality={100}
                className="absolute -z-20 object-cover md:object-fill"
            />

            <Header />

            <Wrapper>
                <section className="relative flex h-[calc(80vh)] flex-col items-center justify-center py-4
                md:min-h-[80vh] md:flex-row md:items-center md:justify-start md:py-0">

                    {/* FLYER */}
                    <div className="relative z-20 w-48
                    sm:w-56 md:absolute md:bottom-[10%] md:right-[8%] md:mt-0 md:w-64 lg:right-[4%]">
                        <Link href="/cardapio">
                            <Image
                                src={Flyer}
                                alt="Flyer Vontade de Comer"
                                priority
                                quality={100}
                                className="w-full object-contain rotate-[-14deg] transition-transform duration-300 
                                hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_10px_25px_rgba(253,252,252,0.6)]"
                            />
                        </Link>
                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10 mt-16 w-full max-w-162.5 px-4 text-center 
                    md:mt-52 md:px-0 md:pb-10 md:ps-10 md:text-left">
                        <h4 className="font-google text-md italic text-white 
                        md:text-md">
                            Escolha sua opção em
                        </h4>

                        <div className="mt-3 flex flex-col">
                            <h1 className="font-google text-5xl font-regular leading-[0.95] text-white 
                            md:text-7xl">
                                Nosso
                            </h1>

                            <h1 className="font-google text-5xl font-medium leading-[0.95] text-[#F97318] 
                            md:text-7xl">
                                Cardápio
                            </h1>
                        </div>

                        <span className="mt-5 block font-google text-lg font-light leading-tight text-white 
                        sm:text-base md:text-xl">
                            Sabor, qualidade, e aquele
                            <br />
                            jeitinho carinhoso que você ama!
                        </span>
                    </div>
                </section>
            </Wrapper>
      </main>

      {/* ÁREA DO CARDÁPIO */}
      <main className="w-full max-w-full mb-14 
      min-[1920px]:mx-auto min-[1920px]:max-w-7xl min-[1920px]:mb-0">
        <div className="flex w-full flex-col 
        md:flex-row">

          {/* MENU / CATEGORIAS */}
          <article className="w-full border-b border-[#818181] px-4 py-6 
          sm:p-4 md:max-w-1/4 md:border-b-0 md:border-r">
            <h3 className="font-google text-lg font-light 
            sm:text-xl md:mt-6">
              Filtrar categoria
            </h3>

            <div className="mt-2 flex w-full flex-col md:mt-8">
              {/* MENU */}
              <div className="w-full overflow-hidden rounded-xl border border-[#353535]">
                <ul className="flex w-full flex-row divide-x divide-[#505050] overflow-x-auto rounded-xl md:flex-col md:divide-x-0 md:divide-y">
                  <OptionCategory
                    id="all"
                    nameCategory="Todos os produtos"
                    menuActive={activeCategory === "all"}
                    onActive={()=> changeStatus("all")}
                  />

                  {loadingCategories && (
                    <li className="shrink-0 p-4 text-sm font-google text-gray-500">
                      Carregando categorias...
                    </li>
                  )}

                  {categoriesError && (
                    <li className="shrink-0 p-4 text-sm font-google text-red-500">
                      Não foi possível carregar as categorias.
                    </li>
                  )}

                  {!loadingCategories &&
                    !categoriesError &&
                    categories.map((category) => (
                      <OptionCategory
                        key={category.id}
                        id={String(category.id)}
                        nameCategory={category.name}
                        menuActive={activeCategory === String(category.id)}
                        onActive={()=> changeStatus(String(category.id))}
                      />
                    ))}
                </ul>
              </div>

              {/* BANNER LATERAL */}
              <Image
                alt="Banner"
                src={Banner}
                quality={100}
                className="mt-20 hidden w-full rounded-xl border md:block"
              />
            </div>
          </article>

          {/* CARDS / PESQUISA */}
          <section className="flex w-full min-w-0 flex-col px-3 pt-8 sm:p-4 md:max-w-3/4">
            {/* INPUT */}
            <InputSearch
              type="text"
              placeholder="Buscar no cardápio..."
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
            />

            {/* CARDS MODAL */}
            <div className="mt-8 w-full sm:mt-10 md:mt-12">
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
  );
}
