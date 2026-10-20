"use client";

import React, { InputHTMLAttributes } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Types
type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
    name?: string;
}

type InputPasswordProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
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


export function InputPassword({ name, ...rest }: InputPasswordProps) {
    
    // CHANGE TYPE PASSWORD
    const [isShow, setIsShow] = React.useState(false);

    return (
        <div className="relative flex w-full max-w-full flex-col gap-2">
            <label className="font-google text-sm font-normal">{name}</label>

            <input
             {...rest}
             type={isShow ? "text" : "password"}
             className="w-full rounded-xl border border-[#777777] bg-[#161616] py-3 ps-4 pe-12 font-google 
             font-normal transition-all placeholder:italic placeholder:opacity-70 hover:border-[#A2A2A2]"
            />

            <button
             type="button"
             onClick={() => setIsShow((previous) => !previous)}
             aria-label={isShow ? "Ocultar senha" : "Mostrar senha"}
             className="absolute right-4 top-10 z-10 cursor-pointer"
            >
                {isShow ? (
                    <FaEye size={24} color="#fff" />
                ) : (
                    <FaEyeSlash size={24} color="#fff" />
                )}
            </button>
        </div>
    );
}