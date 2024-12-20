import { CAvatar, CButton, CCard, CCardBody, CCol, CForm, CFormCheck, CFormInput, CFormSelect } from "@coreui/react";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const authService = new AuthService();

export default function Profile() {
    const [editable, setEditable] = useState(false)
    const { logout, user } = useAuth();

    async function handleLogout() {
        const response = await authService.logout();

        if (!response.isOk) {
            toast(response.message, { type: "error" })
            return;
        } 

        logout();
    }

    return <>
        <CCard>
            <CCardBody>
                {/* <CButton color="primary" variant="outline" onClick={handleLogout}>Log out</CButton> */}
                <CForm className="row g-3">
                    <CCol xs={12} className="d-flex justify-content-center">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <CAvatar color="primary" size="xl" textColor="white">
                                {user?.username[0].toUpperCase() }    
                            </CAvatar>
                            <h4 className="pt-2">{user?.username}</h4>
                        </div>
                    </CCol>
                    <CCol xs={12}>
                        <h5>Profile Information</h5>
                    </CCol>
                    <CCol md={3}>
                        <CFormInput 
                            disabled 
                            type="text" 
                            label="Username"
                            value={"test username"} 
                            />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput 
                            disabled 
                            type="email" 
                            label="Email" 
                            value={"test email"} 
                            />
                    </CCol>
                    <CCol xs={3}>
                        <CFormInput 
                            disabled 
                            type="text" 
                            label="Gender"
                            value={"test gender"} 
                            />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput 
                            disabled 
                            type="input" 
                            label="Date Of Birth"
                            value={"test date of birth"} 
                            />
                    </CCol>
                    <CCol xs={3}>
                        <CFormInput 
                            disabled 
                            type="number" 
                            label="Weight"
                            value={10} 
                            />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput 
                            disabled 
                            type="text" 
                            label="Weight Measurement"
                            value={"test weight measurement"} 
                            />
                    </CCol>
                    <CCol xs={3}>
                        <CFormInput 
                            disabled 
                            type="number" 
                            label="Height"
                            value={10} 
                            />
                    </CCol>
                    <CCol md={3}>
                        <CFormInput 
                            disabled 
                            type="text" 
                            label="Height Measurement"
                            value={"test height measurement"} 
                            />
                    </CCol>
                    <CCol xs={12}>
                        <CFormCheck type="checkbox" label="Edit"/>
                    </CCol>
                    <CCol xs={12}>
                        <CButton color="primary" type="submit" disabled>Edit Profile</CButton>
                    </CCol>
                </CForm>
            </CCardBody>
        </CCard>
    </>
}