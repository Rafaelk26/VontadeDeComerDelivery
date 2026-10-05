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
                className=" flex w-max items-center gap-2 rounded-md bg-[#F97318] px-5 py-2.5 font-google 
                    text-lg font-semibold text-black transition-all hover:scale-105 hover:cursor-pointer
                    hover:text-white">
                    { text }
                </button>
            ) }
        </>
    )
}