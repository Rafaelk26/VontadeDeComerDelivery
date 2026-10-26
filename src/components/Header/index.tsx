"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdCart } from "react-icons/io";
import { usePathname } from "next/navigation";
import { MdSpaceDashboard, MdOutlineRestaurantMenu} from "react-icons/md";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

// Function
import { handleLogoutInServer } from "@/function/handleLogoutInServer";

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
                ${pathname === "/" 
                  ? "text-[#F97318]" 
                  : "text-white hover:text-[#F97318]"
                }`}>
                <MdSpaceDashboard
                 size={24}
                 className={`
                    ${pathname === "/" 
                      ? "text-[#F97318]"
                      : "text-white group-hover:text-[#F97318]"
                    }`} />
                Início
              </Link>
            </li>

            {/* CARDÁPIO */}
            <li>
              <Link
                href="/cardapio"
                className={`font-google transition-all group flex gap-2
                hover:cursor-pointer
                ${pathname === "/cardapio" 
                  ? "text-[#F97318]" 
                  : "text-white hover:text-[#F97318]"
                }`}>
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


export function HeaderAdmin(){

  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-[#505050] bg-[#0B0B0B] px-8 py-2">
      {/* LOGO AND MENU */}
      <div className="flex items-center gap-10">
        <Image
          alt="Logo Oficial"
          src={Logo}
          className="h-12 w-12"
        />

        <nav>
          <ul className="flex gap-6">
            {/* PAINEL */}
            <li>
              <Link
                href="/admin/home"
                className={`group flex items-center gap-2 font-google transition-all hover:cursor-pointer ${
                  pathname === "/admin/home"
                  ? "text-[#F97318]"
                  : "text-white hover:text-[#F97318]"
                }`}
              >
                <MdSpaceDashboard
                  size={24}
                  className={
                    pathname === "/admin/home"
                    ? "text-[#F97318]"
                    : "text-white group-hover:text-[#F97318]"
                  }
                />
                Painel
              </Link>
            </li>

            {/* CATEGORIAS */}
            <li>
              <Link
                href="/admin/categoria"
                className={`group flex items-center gap-2 font-google transition-all hover:cursor-pointer ${
                  pathname === "/admin/categoria"
                  ? "text-[#F97318]"
                  : "text-white hover:text-[#F97318]"
                }`}
              >
                <MdOutlineRestaurantMenu
                  size={24}
                  className={
                    pathname === "/admin/categoria"
                    ? "text-[#F97318]"
                    : "text-white group-hover:text-[#F97318]"
                  }
                />
                Categorias
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* ADMIN PROFILE */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          aria-expanded={isProfileOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#1A1A1A]"
        >
          <FaUserCircle size={24} color="#9F9F9F" />

          <div className="flex flex-col items-start">
            <h4 className="font-google text-sm font-medium text-white">
              Administrador
            </h4>

            <span className="font-google text-xs font-light text-[#747474]">
              Perfil
            </span>
          </div>
        </button>

        {/* PROFILE MENU */}
        {isProfileOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-[#383838] bg-[#141414] py-2 shadow-xl"
          >
            <button
              type="button"
              role="menuitem"
              onClick={()=> {
                setIsProfileOpen(false);
                handleLogoutInServer()
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left font-google text-sm text-red-400 transition-colors hover:bg-[#252525]"
            >
              <FaSignOutAlt size={16} />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
