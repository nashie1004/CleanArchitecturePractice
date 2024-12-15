import { useColorModes } from "@coreui/react";
import { useState, createContext, useEffect, ReactNode } from "react";

export type ThemeColors = "auto" | "light" | "dark";

interface IThemeContext {
    theme: ThemeColors;
    setTheme: (val: ThemeColors) => void; // Fixed return type to void
}

interface ThemeContextProps {
    children: ReactNode;
}

export const themeContext = createContext<IThemeContext>({
    theme: "auto",
    setTheme: () => {}, // No-op function as a placeholder
});

// ThemeContext provider component
export default function ThemeContext({ children }: ThemeContextProps) {
    const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')
    const [theme, setTheme] = useState<ThemeColors>(colorMode === undefined ? "auto" : colorMode);

    const data: IThemeContext = {
        theme,
        setTheme,
    };

    return (
        <themeContext.Provider value={data}>
            {children}
        </themeContext.Provider>
    );
}
