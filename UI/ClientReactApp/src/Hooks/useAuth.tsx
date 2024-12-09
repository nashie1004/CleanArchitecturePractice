import { useContext } from "react";
import { authContext } from "../Context/AuthContext";

export default function useAuth(){
    return useContext(authContext);
}