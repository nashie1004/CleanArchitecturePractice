import CIcon from "@coreui/icons-react";
import { CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton, CSidebarFooter, CSidebarToggler, CBadge, CNavGroup, CNavItem, CNavTitle, CSidebarNav } from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import { cilSpeedometer, cilPuzzle, cilCloudDownload, cilLayers } from "@coreui/icons";
import { useState } from "react";

const tempItems = new Array(20).fill(0);

export default function AppSidebar() {
    const [visible, setVisible] = useState(true);

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
            <CSidebarNav>
                <CNavTitle>Nav Title</CNavTitle>
                <CNavItem href="#"><CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item</CNavItem>
                <CNavItem href="#"><CIcon customClassName="nav-icon" icon={cilSpeedometer} /> With badge <CBadge color="primary ms-auto">NEW</CBadge></CNavItem>
                <CNavGroup
                    toggler={
                        <>
                            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown
                        </>
                    }
                >
                    <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
                    <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item</CNavItem>
                </CNavGroup>
                <CNavItem href="https://coreui.io"><CIcon customClassName="nav-icon" icon={cilCloudDownload} /> Download CoreUI</CNavItem>
                <CNavItem href="https://coreui.io/pro/"><CIcon customClassName="nav-icon" icon={cilLayers} /> Try CoreUI PRO</CNavItem>
                <AppSidebarNav items={tempItems} />
            </CSidebarNav>
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