import CIcon from "@coreui/icons-react";
import { CSidebar, CSidebarHeader, CSidebarBrand, CCloseButton, CSidebarFooter, CSidebarToggler } from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";

export default function AppSidebar() {

    return <>
        <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={false}
            visible={true}
            onVisibleChange={(visible) => {
                //dispatch({ type: 'set', sidebarShow: visible })
            }}
        >
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand>
                    <CIcon customClassName="sidebar-brand-full"  height={32} />
                    <CIcon customClassName="sidebar-brand-narrow"  height={32} />
                </CSidebarBrand>
                <CCloseButton
                    className="d-lg-none"
                    dark
                />
            </CSidebarHeader>
            <AppSidebarNav items={[]} />
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler
                />
            </CSidebarFooter>
        </CSidebar>
    </>;
}