import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function RedirectAuth(){
    const navigate = useNavigate();

    useEffect(() => {

        if (false){
            navigate("/login")
        }
        
    }, [])

    return <Outlet />
}