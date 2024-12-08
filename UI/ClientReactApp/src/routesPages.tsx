import AppDefaultLayout from "./Components/AppDefaultLayout";
import About from "./Views/About/About";
import Login from "./Views/Auth/Login";
import Register from "./Views/Auth/Register";

const routesPages = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "*",
        element: <AppDefaultLayout />
    },
]

export default routesPages;