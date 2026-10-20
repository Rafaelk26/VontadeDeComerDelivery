"use client";
import React, { createContext, useContext, useState } from "react";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type UserContextProps = {
    user: UserProps | null;
    handleUserInContext: (user: UserProps | null) => void;
};

const userContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({children}: {children: React.ReactNode}){
    const [user, setUser] = useState<UserProps | null>(null);

    function handleUserInContext(user: UserProps | null) {
        setUser(user);
    }

    return (
        <userContext.Provider value={{ user, handleUserInContext }}>
        {children}
        </userContext.Provider>
    );
}

export function useUser(){
    const context = useContext(userContext);

    if (!context){
        throw new Error("useUser deve ser usado dentro de UserProvider.");
    }

    return context;
}
