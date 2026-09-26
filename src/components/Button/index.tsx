import { ButtonHTMLAttributes } from "react";

// Type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
}

export function Button({ text, ...rest }: ButtonProps){
    return(
        <button 
        { ...rest }
        className="mt-6 flex w-fit items-center gap-2 rounded-md bg-[#F97318] px-5 py-2.5 font-google 
            text-lg font-semibold text-black transition-all hover:scale-105 hover:cursor-pointer
            hover:text-white">
            { text }
        </button>
    )
}