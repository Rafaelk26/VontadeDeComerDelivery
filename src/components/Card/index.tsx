"use client"
import React from "react";
import Image from "next/image";
import { Bounce, toast } from "react-toastify";

// Components
import { Button } from "../Button";

// Assets
import Caldo from "../../../public/Caldo.png";

export function Card(){
    const [quantity, setQuantity] = React.useState<number>(0);

    function addList(){
        setQuantity(quantity + 1);
    }

    function delList(){
        if(quantity > 0){
            setQuantity(quantity - 1);
        }
        if(quantity <= 0){
            toast.error('Não é possível diminuir o valor',{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "dark",
                transition: Bounce,
            });
            return
        }
    }

    return(
        <div className="w-full border-2 border-[#505050] rounded-2xl">
            {/* IMAGEM */}
            <Image 
             alt="Caldo PNG" 
             src={Caldo} 
             className="w-full h-52 object-cover rounded-tr-2xl rounded-tl-2xl"
            />

            {/* PADDING CONTENT */}
            <div className="w-full mt-6 px-4 pb-6 flex flex-col gap-3">
                {/* CATEGORIA */}
                <div className="w-max bg-[#1D1D1D] border-[0.5px] border-[#666666] py-1 px-2 rounded">
                    <span className="font-google font-light text-sm">
                        Caldos
                    </span>
                </div>

                {/* NOME */}
                <h1 className="font-google font-bold text-2xl/6">
                    Caldo de mandioca com carne seca
                </h1>

                {/* DESCRIÇÃO */}
                <span className="font-google font-light text-[#C2C2C2]">
                    Caldo de mandioca cremosa com carne seca e temperos especiais.
                </span>

                {/* PREÇO E QUANTIDADE */}
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-0">
                        <h1 className="font-google font-bold text-3xl text-[#F97318]">
                            R$ 12,00
                        </h1>
                        <span className="font-google font-light text-md">
                            300ml
                        </span>
                    </div>
                    <div className="flex gap-6 border items-center py-1 px-2 rounded-md">
                        <button 
                         onClick={delList}
                         className="font-google font-semibold text-2xl">
                            -
                        </button>
                        <span className="font-google font-bold">
                            {quantity}
                        </span>
                        <button 
                         onClick={addList}
                         className="font-google font-semibold text-2xl">
                            +
                        </button>
                    </div>
                </div>

                {/* BUTTON ADD CART */}
                <div className="w-full flex justify-center">
                    <Button text="Adicionar ao carrinho" key={1} />
                </div>
            </div>
        </div>
    )
}