import React from 'react'
import PropTypes from 'prop-types'

import { CBadge, CNavGroup, CNavItem, CNavLink, CNavTitle, CSidebar, CSidebarNav } from '@coreui/react'
import { cilSpeedometer, cilPuzzle, cilCloudDownload, cilLayers } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

export const AppSidebarNav = ({ items }) => {
    /*
    const navLink = (name, icon, badge, indent = false) => {
        return (
            <>
                {icon
                    ? icon
                    : indent && (
                        <span className="nav-icon">
                            <span className="nav-icon-bullet"></span>
                        </span>
                    )}
                {name && name}
                {badge && (
                    <CBadge color={badge.color} className="ms-auto" size="sm">
                        {badge.text}
                    </CBadge>
                )}
            </>
        )
    }

    const navItem = (item, index, indent = false) => {
        const { component, name, badge, icon, ...rest } = item
        const Component = component
        return (
            <Component as="div" key={index}>
                {rest.to || rest.href ? (
                    <CNavLink
                        {...(rest.to && { as: <>todo</> })}
                        {...(rest.href && { target: '_blank', rel: 'noopener noreferrer' })}
                        {...rest}
                    >
                        {navLink(name, icon, badge, indent)}
                    </CNavLink>
                ) : (
                    navLink(name, icon, badge, indent)
                )}
            </Component>
        )
    }

    const navGroup = (item, index) => {
        const { component, name, icon, items, to, ...rest } = item
        const Component = component
        return (
            <Component compact as="div" key={index} toggler={navLink(name, icon)} {...rest}>
                {item.items?.map((item, index) =>
                    item.items ? navGroup(item, index) : navItem(item, index, true),
                )}
            </Component>
        )
    }
    */

    function navItem() {
        return (
            <CSidebarNav>
                <CNavTitle>Nav Title</CNavTitle>
                <CNavItem href="#"><CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Nav item sd</CNavItem>
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
            </CSidebarNav>
        )
    }

    return (
        <>
            {/*
            {items &&
                items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
                */ }
            {items.map((item, idx) => {
                return <CNavItem href="https://coreui.io"><CIcon customClassName="nav-icon" icon={cilCloudDownload} /> 123 Download CoreUI</CNavItem>
            })}
        </>
    )
}

AppSidebarNav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
