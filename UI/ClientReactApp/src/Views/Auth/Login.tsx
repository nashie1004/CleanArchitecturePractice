import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormText,
    CInputGroup,
    CInputGroupText,
    CRow,
    CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from "../../Services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import useFirstRender from '../../Hooks/useFirstRender';
import useAuth from '../../Hooks/useAuth';

const schema = z.object({
    username: z.string().min(8, "Username must contain at least 8 character(s)"),
    password: z.string().min(8, "Password must contain at least 8 character(s)")
});

type FormFields = z.infer<typeof schema>;

const authService = new AuthService();

const Login = () => {
    const navigate = useNavigate();
    const firstRender = useFirstRender();
    const {isSignedIn, login} = useAuth();

    const {
        register, handleSubmit, setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        defaultValues: {

        },
        resolver: zodResolver(schema)
    })

    async function submitForm(data: FormFields) {
        const response = await authService.login({
            username: data.username
            , password: data.password
        });

        if (!response.isOk) {
            toast(response.message, { type: "error" })
            return;
        }

        login({
            username: "",
            email: "",
            profileImg: ""
        });

        navigate("/")
    }

    useEffect(() => {
        if (isSignedIn){
            navigate("/")
        }
    }, [])

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <ToastContainer theme="dark" autoClose={4000} />
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm onSubmit={handleSubmit(submitForm)}>
                                    <h1>Login</h1>
                                    <p className="text-body-secondary">
                                        Sign in to your account or <NavLink to="/register" style={{ textDecoration: "none"}}> 
                                            Register
                                        </NavLink>
                                    </p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Username"
                                            autoComplete="username"
                                            feedbackInvalid={errors.username ? errors.username.message : ""}
                                            invalid={errors.username ? true : false}
                                            valid={!errors.username && !firstRender ? true : false}
                                            {...register("username")}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            feedbackInvalid={errors.password ? errors.password.message : ""}
                                            invalid={errors.password ? true : false}
                                            valid={!errors.password && !firstRender ? true : false}
                                            {...register("password")}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="dark" type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? <CSpinner /> : "Login Now"}
                                        </CButton>
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

export default Login