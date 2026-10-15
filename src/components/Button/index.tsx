import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

// Type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    linkPath?: string;
}

export function Button({ text, linkPath, ...rest }: ButtonProps){
    return(
        <>
            { linkPath ? (
                <Link 
                className="w-full max-w-max flex"
                href={linkPath}>
                    <button 
                    { ...rest }
                    className="flex w-full max-w-max items-center gap-2 rounded-md bg-[#F97318] px-5 py-2.5 font-google 
                        text-lg font-semibold text-black transition-all hover:scale-105 hover:cursor-pointer
                        hover:text-white">
                        { text }
                    </button>
                </Link>
            ) : (
                <button 
                { ...rest }
                className=" flex w-full justify-center items-center gap-2 rounded-md bg-[#F97318] px-5 py-2.5 font-google 
                    text-lg font-semibold text-black transition-all hover:scale-105 hover:cursor-pointer
                    hover:text-white">
                    { text }
                </button>
            ) }
        </>
    )
}

export function ButtonCancel({ text, ...rest }: ButtonProps){
    return(
        <>
            <button 
            { ...rest }
            className=" flex w-full justify-center items-center gap-2 rounded-md bg-transparent px-5 py-2.5 font-google 
                text-lg font-semibold text-white transition-all hover:scale-105 hover:cursor-pointer border border-[#8C8C8C] hover:bg-stone-900
                hover:text-white">
                { text }
            </button>
        </>
    )
}