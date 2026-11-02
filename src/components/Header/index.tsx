"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdCart } from "react-icons/io";
import { usePathname } from "next/navigation";
import { MdSpaceDashboard, MdOutlineRestaurantMenu } from "react-icons/md";
import { FaBars, FaSignOutAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";

// Function
import { handleLogoutInServer } from "@/function/handleLogoutInServer";

// Context
import { cartContext } from "@/context/Cart/useCart";

// Assets
import Logo from "../../../public/Logo.png";

export function Header(){
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const context = React.useContext(cartContext);

  if(!context){
    throw new Error("Item precisa estar no CartProvider.");
  }

  const { cart } = context;

  const linkClass = (path: string)=> `font-google transition-all group flex items-center gap-2 
  ${
    pathname === path
    ? "text-[#F97318]"
    : "text-white hover:text-[#F97318]"
  }`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#505050] bg-[#0B0B0B]">

      <div className="flex items-center justify-between px-4 py-2 sm:px-8">

        {/* LOGO E NAVEGAÇÃO DESKTOP */}
        <div className="flex items-center gap-10">

          <Link href="/" aria-label="Página inicial">
            <Image
              alt="Logo Oficial"
              src={Logo}
              className="h-12 w-12"
              priority
            />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-6">

              <li>
                <Link href="/" className={linkClass("/")}>
                  <MdSpaceDashboard size={24} />
                  Início
                </Link>
              </li>

              <li>
                <Link href="/cardapio" className={linkClass("/cardapio")}>
                  <MdOutlineRestaurantMenu size={24} />
                  Cardápio
                </Link>
              </li>

            </ul>
          </nav>
        </div>

        {/* AÇÕES */}
        <div className="flex items-center gap-5">

          <Link
            href="/carrinho"
            aria-label="Abrir carrinho"
            className="relative"
          >
            <IoMdCart size={26} color="#fff" />

            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F97318] px-1 text-xs text-white">
                {cart.length}
              </span>
            )}
          </Link>

          {/* BOTÃO MOBILE */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="text-white md:hidden"
          >
            {isMenuOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>

        </div>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-[#383838] bg-[#0B0B0B] px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-2">

            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`${linkClass("/")} rounded-lg px-3 py-3 hover:bg-[#1A1A1A]`}
              >
                <MdSpaceDashboard size={22} />
                Início
              </Link>
            </li>

            <li>
              <Link
                href="/cardapio"
                onClick={() => setIsMenuOpen(false)}
                className={`${linkClass("/cardapio")} rounded-lg px-3 py-3 hover:bg-[#1A1A1A]`}
              >
                <MdOutlineRestaurantMenu size={22} />
                Cardápio
              </Link>
            </li>

          </ul>
        </nav>
      )}
    </header>
  );
}

export function HeaderAdmin(){
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const links = [
    {
      href: "/admin/home",
      label: "Painel",
      icon: MdSpaceDashboard,
    },
    {
      href: "/admin/categoria",
      label: "Categorias",
      icon: MdOutlineRestaurantMenu,
    },
    {
      href: "/admin/pedidos",
      label: "Pedidos",
      icon: IoNewspaper,
    },
  ];

  const linkClass = (href: string) =>
    `group flex items-center gap-2 font-google transition-all ${
      pathname === href
        ? "text-[#F97318]"
        : "text-white hover:text-[#F97318]"
    }`;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#505050] bg-[#0B0B0B]">

      <div className="flex items-center justify-between px-4 py-2 sm:px-8">

        {/* LOGO E MENU DESKTOP */}
        <div className="flex items-center gap-10">

          <Link href="/admin/home" aria-label="Painel administrativo">
            <Image
              alt="Logo Oficial"
              src={Logo}
              className="h-12 w-12"
              priority
            />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex gap-6">

              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={linkClass(link.href)}
                    >
                      <Icon
                        size={24}
                        className={
                          pathname === link.href
                            ? "text-[#F97318]"
                            : "text-white group-hover:text-[#F97318]"
                        }
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}

            </ul>
          </nav>

        </div>

        {/* AÇÕES */}
        <div className="flex items-center gap-4">

          {/* PERFIL */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-[#1A1A1A] sm:px-3"
            >
              <FaUserCircle size={24} color="#9F9F9F" />

              <div className="hidden flex-col items-start sm:flex">
                <h4 className="font-google text-sm font-medium text-white">
                  Administrador
                </h4>

                <span className="font-google text-xs font-light text-[#747474]">
                  Perfil
                </span>
              </div>
            </button>

            {isProfileOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-[#383838] bg-[#141414] py-2 shadow-xl"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileOpen(false);
                    handleLogoutInServer();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left font-google text-sm text-red-400 transition-colors hover:bg-[#252525]"
                >
                  <FaSignOutAlt size={16} />
                  Sair
                </button>
              </div>
            )}

          </div>

          {/* BOTÃO MOBILE */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="admin-mobile-navigation"
            className="text-white md:hidden"
          >
            {isMenuOpen ? (
              <FaTimes size={24} />
            ) : (
              <FaBars size={24} />
            )}
          </button>

        </div>

      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <nav
          id="admin-mobile-navigation"
          className="border-t border-[#383838] bg-[#0B0B0B] px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-2">

            {links.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${linkClass(link.href)} rounded-lg px-3 py-3 hover:bg-[#1A1A1A]`}
                  >
                    <Icon size={22} />
                    {link.label}
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>
      )}

    </header>
  );
}
