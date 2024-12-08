import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";

export default function RedirectAuth(){
    const navigate = useNavigate();
    const { isSignedIn } = useAuth();

    console.log(isSignedIn)
    useEffect(() => {

        if (!isSignedIn){
            navigate("/login")
        }
        
    }, [])

    return <Outlet />
}