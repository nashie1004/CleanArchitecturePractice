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
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <Error />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])

function App() {

  return (
      <>
          <RouterProvider router={router} />
    </>
  )
}

export default App
