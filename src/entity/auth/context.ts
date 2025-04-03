import { createContext } from 'react';

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
