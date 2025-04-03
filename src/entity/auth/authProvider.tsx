import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./context";

type PropsType = {
    children: ReactNode,
}

export const AuthProvider: FC<PropsType> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};