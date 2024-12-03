import { useState, useEffect } from "react";
import api from "../Services/api";

function AuthContext() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

        const fetchMe = async () => {
            try {
                const res = await api
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