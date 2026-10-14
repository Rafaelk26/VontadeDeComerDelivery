"use client";
import React, { ReactNode } from "react";

// Types
type CartProps = {
  children: ReactNode;
};

export type itemCartProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: number;
  photo: string;
  subtotal: number;
};

type CartContextProps = {
  cart: itemCartProps[];
  setCart: React.Dispatch<React.SetStateAction<itemCartProps[]>>;
  addItemCart: (item: itemCartProps) => void;
  removeItemCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isLoaded: boolean;
};

export const cartContext = React.createContext<CartContextProps | null>(null);

const STORAGE_KEY = "items";
const EMPTY_CART: itemCartProps[] = [];

// Estado externo do carrinho
let cartSnapshot: itemCartProps[] = [];
let isLoaded = false;
const listeners = new Set<()=> void>();

function emitChange() {
  listeners.forEach((listener)=> listener());
}

function subscribe(listener:()=> void){
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getCartSnapshot(){
  return cartSnapshot;
}

function getServerCartSnapshot():itemCartProps[]{
  return EMPTY_CART;
}

function getLoadedSnapshot(){
  return isLoaded;
}

function getServerLoadedSnapshot(){
  return false;
}

// Hidrata o armazenamento externo uma única vez no navegador.
let hydrationStarted = false;

function hydrateCart() {
  if (typeof window === "undefined" || hydrationStarted) return;

  hydrationStarted = true;

  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (savedCart) {
      const parsed: unknown = JSON.parse(savedCart);

      if (Array.isArray(parsed)) {
        cartSnapshot = parsed as itemCartProps[];
      }
    }
  } catch (error) {
    console.error("Erro ao recuperar o carrinho:", error);
  }

  isLoaded = true;
  emitChange();
}

function saveCart(nextCart: itemCartProps[]) {
  cartSnapshot = nextCart;

  if (typeof window !== "undefined" && isLoaded) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCart));
    } catch (error) {
      console.error("Erro ao salvar o carrinho:", error);
    }
  }

  emitChange();
}

export function CartProvider({ children }: CartProps) {
  const cart = React.useSyncExternalStore(subscribe, getCartSnapshot, getServerCartSnapshot);
  const loaded = React.useSyncExternalStore(subscribe, getLoadedSnapshot, getServerLoadedSnapshot);

  React.useEffect(() => {
    hydrateCart();
  }, []);

  const setCart: React.Dispatch<
    React.SetStateAction<itemCartProps[]>
  > = React.useCallback((action) => {
    const nextCart =
      typeof action === "function"
        ? action(cartSnapshot)
        : action;

    saveCart(nextCart);
  }, []);

  function addItemCart(item: itemCartProps){
    const existingItem = cartSnapshot.find((i) => i.id === item.id);

    let nextCart: itemCartProps[];

    if(existingItem){
      nextCart = cartSnapshot.map((i)=> {
        if (i.id !== item.id) return i;
        const quantity = i.quantity + item.quantity;
        return {...i, quantity, subtotal: Number(i.price) * quantity};
      });
    } 
    else{
        nextCart = [...cartSnapshot, {...item, subtotal: Number(item.price) * item.quantity}];
    }

    saveCart(nextCart);
  }

  function removeItemCart(id: string){
    saveCart(cartSnapshot.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantity: number){
    if(quantity <= 0){
      removeItemCart(id);
      return;
    }

    saveCart(
      cartSnapshot.map((item)=> item.id === id
        ? {
            ...item,
            quantity,
            subtotal: Number(item.price) * quantity,
        }
        : item
      )
    );
  }

  return (
    <cartContext.Provider value={{ cart, setCart, addItemCart, removeItemCart, updateQuantity, isLoaded: loaded }}>
      {children}
    </cartContext.Provider>
  );
}
