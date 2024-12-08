import { useState, useEffect, createContext } from "react";
import api from "../Services/api";

const authContext = createContext();

function AuthContext() {
    const [token, setToken] = useState<string | null>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {

        const fetchMe = async () => {
            try {
                // const res = await api
            }
            catch {
                setToken(null);
            }
        }

        fetchMe();

    }, [])

  return (
    <p>Hello world!</p>
  );
}

export default AuthContext;