import { useContext } from "react";
import {sidebarContext} from "../Context/SidebarContext";

export default function useSidebar(){
    return useContext(sidebarContext);
}