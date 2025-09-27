"use client";


import React, { createContext, useState, useEffect, ReactNode } from "react";

type User = { username: string; email: string; isAdmin: boolean } | null;

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
