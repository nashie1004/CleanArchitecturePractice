import { useState } from 'react'
import reactLogo from './Assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Views/Auth/Login/Login'
import Register from './Views/Auth/Register/Register'
import Error from './Views/Auth/Error/Error'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <Register />
        <Login />
        <Error />
    </>
  )
}

export default App
