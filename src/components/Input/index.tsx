import { InputHTMLAttributes } from "react";
import { IoSearchOutline } from "react-icons/io5";

// Types
type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
    name?: string;
}

export function Input({ name, ...rest }: InputSearchProps){
    return(
        <>
            <div className="w-full max-w-full relative flex flex-col gap-2">
                <label className="font-google font-regular text-sm">{name}</label>
                <input
                    {...rest}
                    className="w-full py-3 px-4 border border-[#777777] bg-[#161616] font-google font-regular rounded-xl transition-all
                    placeholder:italic placeholder:opacity-70 hover:border-[#A2A2A2]"
                />
            </div>
            
        </>
    )
}

export function InputSearch({ ...rest }: InputSearchProps){
    return(
        <>
            <div className="w-full max-w-full relative flex">
                <IoSearchOutline 
                 size={24} 
                 color="#fff" 
                 className="absolute z-10 top-3 left-3" 
                />
                <input
                 {...rest}
                 className="w-full py-3 ps-12 pe-4 border border-[#777777] bg-[#161616] font-google font-regular rounded-xl transition-all
                 placeholder:italic placeholder:opacity-70 hover:border-[#A2A2A2]"
                />
            </div>
        </>
    )
}