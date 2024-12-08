import CIcon from "@coreui/icons-react";
import { CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton, CSidebarFooter, CSidebarToggler, CBadge, CNavGroup, CNavItem, CNavTitle, CSidebarNav } from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import { cilSpeedometer, cilPuzzle, cilCloudDownload, cilLayers } from "@coreui/icons";
import { useContext, useState } from "react";
import { sidebarContext } from "../Context/SidebarContext";
import nav from "../nav";

const tempItems = new Array(20).fill(0);

export default function AppSidebar() {
    const { visible, setVisible } = useContext(sidebarContext);

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