import { useState } from 'react'
import reactLogo from './Assets/react.svg'
import viteLogo from '/vite.svg'
import './Assets/App.css'
import Login from './Views/Auth/Login/Login'
import Register from './Views/Auth/Register/Register'
import Error from './Views/Error/Error'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultLayout from './Layout/DefaultLayout'
import { BrowserRouter, NavLink, Link, Outlet, Route, Routes } from 'react-router'


function ProtectedRoute() {
    const loggedIn = false;
    return loggedIn ? <Outlet /> : <NavLink to="/login">Login now</NavLink>
}

function App() {
    console.log(import.meta.env.PORT)

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login /> } />
            <Route path="/register" element={<Register /> } />
            <Route element={<ProtectedRoute />}>
                <Route path="*" element={<DefaultLayout />} />
              </Route>
            <Route path="*" element={<Error /> } />
          </Routes>
    </BrowserRouter>
  )
}

export default App
