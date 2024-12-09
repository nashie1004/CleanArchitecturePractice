import { useState, useEffect, createContext, ReactNode } from "react";

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

function AuthContext({children} : AuthContextProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {

    }, [])

    function login(user: User){
        setIsSignedIn(true);
        setUser(user);
    }

    function logout(){
        setIsSignedIn(false);
        setUser(null)
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