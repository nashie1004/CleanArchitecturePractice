import { useState } from 'react'
import reactLogo from './Assets/react.svg'
import viteLogo from '/vite.svg'
import './Assets/App.css'
import Login from './Views/Auth/Login'
import Register from './Views/Auth/Register'
import Error from './Views/Error/Error'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultLayout from './Layout/DefaultLayout'
import { BrowserRouter, NavLink, Link, Outlet, Route, Routes } from 'react-router'
import SidebarContext from './Context/SidebarContext'
import './Assets/style.scss'
import './Assets/examples.scss'


function ProtectedRoute() {
    const loggedIn = false;
    return loggedIn ? <Outlet /> : <>
        <NavLink to="/login">Login now</NavLink>
        <NavLink to="/register">Register now</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
    </>
}

function App() {
    console.log(import.meta.env.PORT)

  return (
      <SidebarContext>
          <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login /> } />
                <Route path="/register" element={<Register /> } />
                <Route path="*" element={<DefaultLayout />} />
              </Routes>
        </BrowserRouter>
      </SidebarContext>
  )
}

export default App
