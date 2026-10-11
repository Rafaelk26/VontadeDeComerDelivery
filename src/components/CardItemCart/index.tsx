import Image from "next/image";
import React from "react";

// Types
import { itemCartProps } from "@/context/Cart/useCart";
interface removeItemCartProps extends itemCartProps{
    item: itemCartProps;
    removeItemCart: (id: string)=> void;
}

export function CardItemCart({removeItemCart, item, name, description, price, category, quantity, photo}: removeItemCartProps){
        const [qtd, setQtd] = React.useState(quantity);

        function addList(value: number){
            const addNumber = value + 1;
            setQtd(addNumber);
        }
    
        function delList(value: number){
            if(value <= 1){
                removeItemCart(item.id);
                return;
            }
            else{
                const removeNumber = value - 1;
                setQtd(removeNumber);
            }
        }

    return(
        <>
            <div
             className="w-full first:pb-8 py-8 last:pt-8">
                <div className="flex">
                    <div>
                        <Image 
                         alt={name}
                         src={photo}
                         className="w-52 h-40 rounded-lg object-cover border border-[#5D5D5D]"
                         width={1400}
                         height={1000}
                        />
                    </div>
                    <div>
                        <span className="font-google">{`NOME: ${name}`}</span><br />
                        <span>{`DESCRIÇÃO: ${description}`}</span><br />
                        <span>{`PREÇO: ${price}`}</span><br />

                        {/* Quantity and Button Remove */}
                        <div className="w-full border-2 border-red-400">
                            <div className="flex gap-6 border border-[#505050] items-center py-1 px-2 rounded-md">
                                <button
                                onClick={()=> delList(qtd)}
                                className="font-google font-semibold text-2xl hover:cursor-pointer">-</button>

                                <span className="font-google font-bold">{qtd}</span>

                                <button
                                onClick={()=> addList(qtd)}
                                className="font-google font-semibold text-2xl hover:cursor-pointer">+</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <span>{`CATEGORIA: ${category}`}</span>
            </div>
        </>
    )
}