import { CButton } from "@coreui/react";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const authService = new AuthService();

export default function Profile() {
    const { logout } = useAuth();

    async function handleLogout() {
        const response = await authService.logout();

        if (!response.isOk) {
            toast(response.message, { type: "error" })
            return;
        } 

        logout();
    }

    return <>
        <CButton color="primary" variant="outline" onClick={handleLogout}>
        Log out
        </CButton>
    </>
}