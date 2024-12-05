import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CToast,
    CToastBody,
    CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from "../../../Services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const authService = new AuthService();

const Register = () => {

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const payLoad = Object.fromEntries(formData);

        if (
            (
            payLoad["password"] !== payLoad["repeatPassword"]
            )
            ||
            payLoad["password"] === "" 
            ||
            payLoad["repeatPassword"] === ""
        ) {

            toast("Password and repeat password do not match", { type: "error" })

            return;
        }

        const response = await authService.register({
            username: payLoad["username"]
            , email: payLoad["email"]
            , password: payLoad["password"]
        });

        if (!response.isOk) {
            toast(response.message, { type: "error" })

            return;
        } 

        toast("Register success. Redirecting...", { type: "success", autoClose: false });

        // TODO Redirect
    }

    useEffect(() => {

    }, [])

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <ToastContainer theme="dark" autoClose={4000}  />
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={submitForm}>
                                    <h1>Register</h1>
                                    <p className="text-body-secondary">Create your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            name="username"
                                            placeholder="Username"
                                            autoComplete="username"
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput
                                            name="email"
                                            placeholder="Email"
                                            autoComplete="email"
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            name="repeatPassword"
                                            type="password"
                                            placeholder="Repeat password"
                                            autoComplete="new-password"
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="dark" type="submit">Create Account</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register