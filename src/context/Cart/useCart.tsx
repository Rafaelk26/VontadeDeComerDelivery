"use client";
import React, { ReactNode } from "react";

// Types
type CartProps = {
    children: ReactNode;
}

type itemCartProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: number;
  photo: string;
};

type CartContextProps = {
  cart: itemCartProps[];
  setCart: React.Dispatch<React.SetStateAction<itemCartProps[]>>;
  addItemCart: (item: itemCartProps)=> void;
};

// Create context
export const cartContext = React.createContext<CartContextProps | null>(null);

// Create provider
export function CartProvider({ children }: CartProps){

    const [cart, setCart] = React.useState<itemCartProps[]>([]);

    function addItemCart(item: itemCartProps){

        // ENCONTRANDO ID IGUAL NO CARRINHO.
        const cartIdIndex = cart.findIndex((i)=> i.id === item.id);

        // SE ID FOR DIFERENTE DOS IDS QUE JÁ POSSUO NO CARRINHO ELE ADICIONA.
        if(cartIdIndex === -1){
            setCart([ ...cart, item ]);
        }
    }

    return (
        <cartContext.Provider value={{ cart, setCart, addItemCart }}>
            { children }
        </cartContext.Provider>
    )
}