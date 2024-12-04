import React, { useEffect } from 'react'
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

const authService = new AuthService();

const Register = () => {

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const payLoad = Object.fromEntries(formData);

        if (payLoad["password"] !== payLoad["repeatPassword"]) {
            alert("incorrect pw")
        }

        const response = await authService.register({
            registerInfo: {
                username: payLoad["username"]
            }
            , email: payLoad["email"]
            , password: payLoad["password"]
        });

        console.log(response, payLoad)
    }

    useEffect(() => {

    }, [])

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CToast autohide={false} visible={true} color="primary" className="text-white align-items-center">
                    <div className="d-flex">
                        <CToastBody>Hello, world! This is a toast message.</CToastBody>
                        <CToastClose className="me-2 m-auto" white />
                    </div>
                </CToast>

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
                                        <CButton color="success" type="submit">Create Account</CButton>
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