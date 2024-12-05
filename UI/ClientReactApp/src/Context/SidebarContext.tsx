import { useState, createContext } from "react";

interface Sidebar{

}

interface ISidebarContext {
    visible: boolean;
    setVisible: () => void;
    narrow: boolean;
    setNarrow: () => void;
}

const sidebarContext = createContext<ISidebarContext | undefined>(undefined);

export default function SidebarContext() {
    const [] = useState(false);

    return [];
}