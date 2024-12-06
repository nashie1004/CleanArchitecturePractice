import { useState, createContext, useEffect, ReactNode } from "react";

interface Sidebar{

}

interface ISidebarContext {
    visible: boolean;
    setVisible: (val: boolean) => boolean;
    narrow: boolean;
    setNarrow: (val: boolean) => boolean;
}

interface SidebarContextProps {
    children: ReactNode
}

export const sidebarContext = createContext<ISidebarContext>({
    visible: true,
    setVisible: () => true,
    narrow: false,
    setNarrow: () => false,
});

export default function SidebarContext({ children }: SidebarContextProps) {
    const [visible, setVisible] = useState(true);
    const [narrow, setNarrow] = useState(false);

    useEffect(() => {

    }, [])

    const data = {
        visible, setVisible, narrow, setNarrow
    }

    return <sidebarContext.Provider value={data}>
        {children }
    </sidebarContext.Provider>;
}