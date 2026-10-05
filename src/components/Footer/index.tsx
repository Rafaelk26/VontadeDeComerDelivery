import Image from "next/image";

// Assets
import Fundo from "../../../public/Footer.png";
import { Wrapper } from "../Wrapper";

export function Footer(){

    const date = new Date();

    return(
        <Wrapper>
            <footer className="w-full relative">
                <div className="w-full absolute top-14 z-10 ps-10">
                    <span className="text-white font-google font-light">
                        &copy;{date.getFullYear()} Vontade de Comer Delivery. 
                        <br />Todos os direitos reservados.
                    </span>
                </div>
                
                <Image
                src={Fundo}
                alt="Fundo Footer"
                className="w-full object-contain"
                />
            </footer>
        </Wrapper>
        
    )
}