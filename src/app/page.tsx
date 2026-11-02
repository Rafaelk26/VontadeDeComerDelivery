"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import { Header } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";
import { Button } from "@/components/Button";
import { TrackItems } from "@/components/TrackItems";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";

// Functions
import { getAllProducts } from "@/function/getAllProducts";

// Type
import type { Product } from "@/types/Products";

// Assets
import Fundo from "../../public/Background Home.png";
import Flyer from "../../public/Flyer.png";

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [productsError, setProductsError] = React.useState(false);

  React.useEffect(() => {
    async function loadProducts() {
      try {
        setLoadingProducts(true);
        setProductsError(false);

        const data = await getAllProducts();

        if(data) setProducts(data);
        
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProductsError(true);
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <>
  
      <main className="relative min-h-screen overflow-hidden">

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
          <section className="relative flex min-h-[calc(100svh-0px)] flex-col items-center justify-center py-12 
          md:min-h-[120vh] md:flex-row md:items-center md:justify-start md:py-0">
            {/* FLYER */}
            <div className="relative z-20 w-52 
            sm:w-60 md:absolute md:bottom-[30%] md:right-[8%] md:mt-0 md:w-64 lg:right-[4%]">
              <Link href="/cardapio">
                <Image
                  src={Flyer}
                  alt="Flyer Vontade de Comer"
                  priority
                  quality={100}
                  className="w-full rotate-[-8deg] object-contain transition-transform duration-300 hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_10px_25px_rgba(253,252,252,0.6)] md:rotate-[-14deg]"
                />
              </Link>
            </div>

            {/* CONTEÚDO */}
            <div className="relative z-10 mt-8 w-full max-w-162.5 px-5 text-center 
            md:pb-10 md:ps-10 md:pe-0 md:text-left">
              <h4 className="font-google text-lg italic text-white 
              sm:text-base md:text-md">
                Sabor &amp; Qualidade
              </h4>

              <div className="mt-3 flex flex-col">

                <h1 className="font-google text-5xl font-regular leading-[0.95] text-white 
                sm:text-5xl md:text-7xl">
                  No conforto
                </h1>

                <h1 className="font-google text-6xl font-medium leading-[0.95] text-[#F97318] 
                sm:text-5xl md:text-7xl">
                  De sua casa
                </h1>

              </div>

              <span className="mx-auto mt-5 block max-w-md font-google text-lg font-light leading-relaxed text-white 
              sm:text-base md:mx-0 md:text-xl">

                Caldos, bebidas, marmitas, e muito mais.
                <br />
                Tudo feito com carinho especial para você!

              </span>

              {/* BOTÃO */}
              <div className="mt-7 flex justify-center 
              md:mt-8 md:justify-start">
                <Button text="Ver cardápio" linkPath="/cardapio" />
              </div>
            </div>
          </section>
        </Wrapper>
      </main>


      {/* TRACK */}
      <main className="w-full overflow-hidden border-t border-b border-[#505050] py-6">
        <div className="flex w-max">
          <div className="flex shrink-0 gap-12 animation-personalized">
            <TrackItems quantity={20} />
          </div>

          <div className="flex shrink-0 gap-12 animation-personalized">
            <TrackItems quantity={20} />
          </div>
        </div>
      </main>


      {/* CARDÁPIO */}
      <main className="mt-24 md:mt-20">
        <Wrapper>
          {/* TÍTULOS */}
          <div className="px-4 md:px-0">
            <h4 className="font-google text-center text-sm italic text-[#F97318] md:text-start md:text-md">
              Nossos produtos
            </h4>

            <h1 className="mx-auto mt-2 max-w-60 font-google text-center text-3xl font-regular leading-tight text-white sm:max-w-md md:mx-0 md:max-w-none md:text-start md:text-3xl md:leading-[0.95]">
              O melhor do nosso cardápio
            </h1>

            <div className="mx-auto mt-3 w-32 border border-[#F97318] sm:w-48 md:mx-0" />
          </div>

          {/* PRODUTOS */}
          <section className="mt-10 grid grid-cols-2 gap-3 px-3 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-4 md:gap-6">
            {loadingProducts && (
              <p className="col-span-full py-10 text-center font-google text-gray-400">
                Carregando produtos...
              </p>
            )}

            {!loadingProducts && productsError && (
              <p className="col-span-full py-10 text-center font-google text-red-400">
                Não foi possível carregar os produtos. Tente novamente mais tarde.
              </p>
            )}

            {!loadingProducts &&
              !productsError &&
              products.length === 0 && (
                <p className="col-span-full py-10 text-center font-google text-gray-400">
                  Nenhum produto disponível no momento.
                </p>
              )}

            {!loadingProducts &&
              !productsError &&
              products
                .filter((product) => product.status === true)
                .slice(0, 8)
                .map((product) => (
                  <Card key={product.id} product={product} />
                ))}
          </section>

          {/* BOTÃO */}
          <div className="mt-8 flex justify-center px-4 
          sm:mt-10">
            <Button
              linkPath="/cardapio"
              text="Ver mais opções"
            />
          </div>
        </Wrapper>
      </main>


      <main className="w-full mt-20 md:mt-24">
        <Footer />
      </main>
    </>
  );
}