import { FC, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { jwtDecode } from 'jwt-decode'

type PropsType = {
    children: ReactNode,
}

export const AuthProvider: FC<PropsType> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const user = jwtDecode(token || '');
        if ('user_id' in user) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};