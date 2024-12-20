import { CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton, CSidebarFooter, CSidebarToggler, CBadge, CNavGroup, CNavItem, CNavTitle, CSidebarNav } from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import { useContext, useState } from "react";
import nav from "../nav";
import useSidebar from "../Hooks/useSidebar";
import { cilBurn } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export default function AppSidebar() {
    const { visible, setVisible } = useSidebar();

    return <>
        <CSidebar
            className="border-end"
            colorScheme="dark"
            visible={visible}
            position="fixed"
        >
            <CSidebarHeader className="border-bottom d-flex align-items-center justify-content-start">
                <CIcon icon={cilBurn} size="xl"/>
                <h5 style={{ letterSpacing: ".1px", paddingLeft: "5px" }} className="mt-2">
                    TheStrength
                    <span style={{ color: "#39f"}}> Logs</span>
                </h5>
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