import { useEffect, useRef, useContext } from 'react'
import {
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CHeader,
    CHeaderNav,
    CHeaderToggler,
    useColorModes,
    CAvatar,
    CDropdownHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilContrast,
    cilLockLocked,
    cilMenu,
    cilMoon,
    cilSun,
} from '@coreui/icons'
import { sidebarContext } from "../Context/SidebarContext"
import AppBreadcrumb from './AppBreadcrumb'
import useTheme from '../Hooks/useTheme'
import { ThemeColors } from '../Context/ThemeContext'
import { NavLink } from 'react-router'
import AuthService from '../Services/AuthService'
import { toast } from "react-toastify";
import useAuth from '../Hooks/useAuth'

const authService = new AuthService();

const AppHeader = () => {
    const headerRef = useRef()
    const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
    const { setVisible } = useContext(sidebarContext);
    const { setTheme } = useTheme();
    const { logout, user } = useAuth();
    
    async function handleLogout() {
        const response = await authService.logout();

        if (!response.isOk) {
            toast(response.message, { type: "error" })
            return;
        } 

        logout();
    }

    function handleThemeSync(theme: ThemeColors){
        setTheme(theme)
        setColorMode(theme);
    }

    useEffect(() => {
        document.addEventListener('scroll', () => {
            headerRef.current &&
                headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
        })
    }, [])

    return (
        <CHeader position="sticky" className="mb-4 p-0" >
            <CContainer className="border-bottom px-4" fluid>
                <CHeaderToggler
                    onClick={() => setVisible(prev => !prev)}
                    style={{ marginInlineStart: '-14px' }}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderNav>
                    <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
                    </li>
                    <CDropdown variant="nav-item" placement="bottom-end">
                        <CDropdownToggle caret={false}>
                            {colorMode === 'dark' ? (
                                <CIcon icon={cilMoon} size="lg" />
                            ) : colorMode === 'auto' ? (
                                <CIcon icon={cilContrast} size="lg" />
                            ) : (
                                <CIcon icon={cilSun} size="lg" />
                            )}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem
                                active={colorMode === 'light'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => handleThemeSync('light')}
                            >
                                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'dark'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => handleThemeSync('dark')}
                            >
                                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'auto'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => handleThemeSync('auto')}
                            >
                                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
                    </li>
                    <CDropdown variant="nav-item">
                    <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                        <CAvatar color="primary" size='md' textColor="white">
                            {user?.username[0].toUpperCase() }    
                        </CAvatar>
                    </CDropdownToggle>
                      <CDropdownMenu className="pt-0" placement="bottom-end">
                        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
                        <CDropdownItem style={{ cursor: "pointer" }}>
                          <NavLink to="/profile" style={{textDecoration: "none", color: "inherit", display: "block" ,width: "100%"}}>
                            <CIcon icon={cilBell} className="me-2" />
                             Profile
                          </NavLink>
                        </CDropdownItem>
                        <CDropdownItem onClick={handleLogout} style={{ cursor: "pointer" }}>
                          <CIcon icon={cilLockLocked} className="me-2" />
                          Log out
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                </CHeaderNav>
            </CContainer>
            <CContainer className="px-4" fluid>
                <AppBreadcrumb />
            </CContainer>
        </CHeader>
    )
}

export default AppHeader
