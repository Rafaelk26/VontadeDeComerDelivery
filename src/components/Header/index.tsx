"use client"

import React from "react";
import Image from "next/image";

import { IoMdCart } from "react-icons/io";
import { MdSpaceDashboard, MdOutlineRestaurantMenu } from "react-icons/md";

import Logo from "../../../public/Logo.png"
import Link from "next/link";

export function Header(){

    return(
        <header className="w-full flex items-center justify-between bg-[#0B0B0B] py-2 px-8 border-b border-[#505050]">

            {/* LOGO AND MENU */}
            <div className="flex gap-10 items-center">
                <Image 
                 alt="Logo Oficial"
                 src={Logo}
                 className="w-12 h-12"
                />
                <nav>
                    <ul className="flex gap-6">
                        <Link
                        href={"/"} 
                        className="font-google transition-all group flex gap-2
                        hover:text-[#F97318] hover:cursor-pointer">
                            <MdSpaceDashboard size={24} className="group-hover:text-[#F97318]" />
                            Ínicio
                        </Link>
                        <Link
                        href={"/cardapio"}
                        className="font-google transition-all group flex gap-2
                        hover:text-[#F97318] hover:cursor-pointer">
                            <MdOutlineRestaurantMenu size={24} className="group-hover:text-[#F97318]" />
                            Cardápio
                        </Link>
                    </ul>
                </nav>
            </div>

            {/* CART */}
            <div className="w-max flex justify-center">
                <Link href={"/carrinho"}>
                    <button className="relative cursor-pointer">
                        <IoMdCart size={24} color="#fff" />
                        {/* COUNT CART */}
                        {/* <div 
                        className="w-5 h-5 absolute -top-2 -right-2 z-10 p-1 bg-[#F97318] 
                        flex justify-center items-center rounded-full">
                            <span className="text-white font-google text-xs">0</span>
                        </div> */}
                    </button>
                </Link>
            </div>
        </header>
    )
}