"use client";
import React, { ReactNode } from "react";

// Types
type userProps = {
    children: ReactNode
}

type itemsUsersProps = {
    id: string;
    name: string;
    email: string;
}

type userContextProps = {
    user: itemsUsersProps[];
    setUser: React.Dispatch<React.SetStateAction<itemsUsersProps[]>>
}

// Create context
export const userContext = React.createContext<userContextProps | undefined>(undefined);

// Create provider
export function UserProvider({ children }: userProps){
    
    const [user, setUser] = React.useState<itemsUsersProps[]>([]);

    return(
        <userContext.Provider value={{ user, setUser }}>
            { children }
        </userContext.Provider>
    )
}