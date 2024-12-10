import { useState, useEffect, createContext, ReactNode } from "react";
import AuthService from "../Services/AuthService";

export interface User{
    username: string;
    profileImg: string;
    email: string;
}

interface IAuthContext{
    isSignedIn: boolean;
    user: null | User;
    login: (user: User) => void;
    logout: () => void;
}

interface AuthContextProps {
    children: ReactNode
}

export const authContext = createContext<IAuthContext>({
    isSignedIn: false,
    user: null,
    login: () => {},
    logout: () => {},
});

const authService = new AuthService();

function AuthContext({children} : AuthContextProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        async function me() {
            const res = await authService.getMe();
            // TODO
            //setIsSignedIn(res.isOk);
            //setUser(res.data);
        }

        //me();

    }, [])

    function login(user: User){
        setIsSignedIn(true);
        setUser(user);
    }

    function logout(){
        setIsSignedIn(false);
        setUser(null)
    }

    async function isStillSignedIn() {
        const response = await authService.getMe();
    }

    const data = {
        user, isSignedIn, login, logout
    }

  return (
    <authContext.Provider value={data}>
        {children}
    </authContext.Provider>
  );
}

export default AuthContext;