"use client"
import Image from "next/image";

// Components
import { Header } from "@/components/Header";
import { Wrapper } from "@/components/Wrapper";
import { Button } from "@/components/Button";
import { TrackItems } from "@/components/TrackItems";
import { Card } from "@/components/Card";

// Assets
import Fundo from "../../public/Background Home.png";
import Flyer from "../../public/Flyer.png";

export default function Home(){
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
          className="absolute inset-0 -z-20 object-fill"
        />

        <Header />

        <Wrapper>
          <section className="relative flex min-h-[calc(100vh-80px)] items-center">
            
            {/* CONTEÚDO */}
            <div className="relative z-10 w-full max-w-[650px] pb-10">
              <h4 className="font-google text-md italic text-white">
                Sabor & Qualidade
              </h4>

              <div className="mt-3 flex flex-col">
                <h1 className="font-google text-5xl font-regular leading-[0.95] text-white md:text-7xl">
                  No conforto
                </h1>

                <h1 className="font-google text-5xl font-medium leading-[0.95] text-[#F97318] md:text-7xl">
                  De sua casa
                </h1>
              </div>

              <span className="mt-5 block font-google text-base font-light leading-tight text-white md:text-xl">
                Caldos, bebidas, marmitas, e muito mais.
                <br />
                Tudo feito com carinho especial para você!
              </span>

              {/* BOTÃO */}
              <Button text="Ver cardápio" key={1} />
            </div>

            {/* FLYER */}
            <div className="absolute bottom-[5%] right-[5%] z-20 md:right-[8%] lg:right-[4%]">
              <Image
                src={Flyer}
                alt="Flyer Vontade de Comer"
                priority
                quality={100}
                className="w-64 object-contain rotate-[-14deg] transition-transform duration-300
                hover:cursor-pointer hover:scale-105 hover:drop-shadow-[0_10px_25px_rgba(253, 252, 252, 0.6)]"
              />
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

      {/* CARDAPIO */}
      <main className="mt-16">
        <Wrapper>
          <h4 className="font-google text-md italic text-[#F97318]">
            Nossos produtos
          </h4>
          <h1 className="font-google text-3xl font-regular leading-[0.95] text-white md:text-3xl">
            O melhor do nosso cardápio
          </h1>
          <div className="w-48 border border-[#F97318] mt-3" />


          <div className="grid grid-cols-4 gap-6 mt-16">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </Wrapper>
      </main>
    </>
  );
}