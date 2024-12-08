import { CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton, CSidebarFooter, CSidebarToggler, CBadge, CNavGroup, CNavItem, CNavTitle, CSidebarNav } from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import { useContext, useState } from "react";
import nav from "../nav";
import useSidebar from "../Hooks/useSidebar";

export default function AppSidebar() {
    const { visible, setVisible } = useSidebar();

    return <>
        <CSidebar
            className="border-end"
            colorScheme="dark"
            visible={visible}
            position="fixed"
        >
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>CoreUI</CSidebarBrand>
            </CSidebarHeader>
            <AppSidebarNav items={nav} />
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler
                    onClick={() => {
                        setVisible(prev => !prev)
                    }}
                />
            </CSidebarFooter>
        </CSidebar>
    </>;
}