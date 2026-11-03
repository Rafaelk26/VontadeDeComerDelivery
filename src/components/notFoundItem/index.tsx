import Image from "next/image"

// Assets
import imgNotFound from '../../../public/NotFound.png';

export function NotFound(){
    return(
        <Image 
         className="w-6/12"
         alt="Não encontrado" 
         src={imgNotFound}
        />
    )
}