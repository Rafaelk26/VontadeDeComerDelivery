import Image from "next/image";

// Assets
import Fundo from "../../../public/Footer.png";

export function Footer() {
  const date = new Date();

  return (
    <footer className="w-full relative">

      {/* COPYRIGHT */}
      <div className="w-full absolute top-8 md:top-14 z-10 px-4 md:px-0 md:ps-10">
        <span className="block text-center md:text-left text-white font-google font-light text-xs sm:text-sm md:text-base">
          &copy;{date.getFullYear()} Vontade de Comer Delivery.
          <br />
          Todos os direitos reservados.
        </span>
      </div>

      {/* IMAGEM DE FUNDO */}
      <Image
        src={Fundo}
        alt="Fundo Footer"
        className="w-full object-cover bg-center h-32 sm:h-36 md:h-40 md:object-fill"
      />

    </footer>
  );
}
