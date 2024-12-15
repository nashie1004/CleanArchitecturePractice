import { useContext } from "react";
import { themeContext } from "../Context/ThemeContext";

export default function useTheme(){
    return useContext(themeContext);
}