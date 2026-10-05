"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdCart } from "react-icons/io";
import { MdSpaceDashboard, MdOutlineRestaurantMenu} from "react-icons/md";
import { usePathname } from "next/navigation";

// Assets
import Logo from "../../../public/Logo.png";

// Context
import { cartContext } from "@/context/Cart/useCart";

export function Header(){

  const pathname = usePathname();
  const context = React.useContext(cartContext);
  if (!context) {
    throw new Error("Item precisa estar no CartProvider.");
  }
  const { cart } = context;

  return (
    <header className="w-full flex items-center justify-between 
    bg-[#0B0B0B] py-2 px-8 border-b border-[#505050] fixed top-0 z-50">
      {/* LOGO AND MENU */}
      <div className="flex gap-10 items-center">
        <Image
         alt="Logo Oficial"
         src={Logo}
         className="w-12 h-12"
        />

        <nav>
          <ul className="flex gap-6">
            {/* INÍCIO */}
            <li>
              <Link
                href="/"
                className={`font-google transition-all group flex gap-2 hover:cursor-pointer
                ${pathname === "/" ? "text-[#F97318]" 
                : "text-white hover:text-[#F97318]"}`}>
                <MdSpaceDashboard
                 size={24}
                 className={`
                    ${pathname === "/" ? "text-[#F97318]"
                    : "text-white group-hover:text-[#F97318]"}`} />
                Início
              </Link>
            </li>

            {/* CARDÁPIO */}
            <li>
              <Link
                href="/cardapio"
                className={`font-google transition-all group flex gap-2
                hover:cursor-pointer
                ${pathname === "/cardapio" ? "text-[#F97318]" 
                : "text-white hover:text-[#F97318]"}`}>
                <MdOutlineRestaurantMenu
                 size={24}
                 className={`
                    ${pathname === "/cardapio" ? "text-[#F97318]" 
                    : "text-white group-hover:text-[#F97318]"}`} />
                Cardápio
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* CART */}
      <div className="w-max flex justify-center">
        <Link href="/carrinho">
          <button className="relative cursor-pointer">
            <IoMdCart
              size={24}
              color="#fff"
            />

            {cart.length > 0 && (
              <div className="w-5 h-5 absolute -top-2 -right-2 z-10 p-1 bg-[#F97318] flex justify-center items-center rounded-full">
                <span className="text-white font-google text-xs">
                  {cart.length}
                </span>
              </div>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}