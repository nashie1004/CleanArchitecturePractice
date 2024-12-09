import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";

export default function RedirectAuth(){
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();

    useEffect(() => {

        if (!isSignedIn){
            navigate("/login")
        }
        
    }, [isSignedIn])

    return <Outlet />
}