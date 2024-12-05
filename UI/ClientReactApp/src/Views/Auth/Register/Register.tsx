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
import AuthService from "../../../Services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const schema = z.object({
    username: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8)
}).superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['repeatPassword']
        });
    }
});

type FormFields = z.infer<typeof schema>;

const authService = new AuthService();

const Register = () => {
    const navigate = useNavigate();

    const {
        register, handleSubmit, setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        defaultValues: {

        },
        resolver: zodResolver(schema)
    })

    async function submitForm(data: FormFields) {
        const response = await authService.register({
            username: data.username
            , email: data.email
            , password: data.password
        });

        if (!response.isOk) {
            toast(response.message, { type: "error" })
            return;
        } 

        toast("Register success. Redirecting...", { type: "success" });
        // TODO Redirect
        navigate("/login")
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
                                <CForm onSubmit={handleSubmit(submitForm)}>
                                    <h1>Register</h1>
                                    <p className="text-body-secondary">Create your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="Username"
                                            autoComplete="username"
                                            feedbackInvalid={errors.username ? errors.username.message : ""}
                                            invalid={errors.username ? true : false}
                                            valid={!errors.username ? true : false}
                                            {...register("username")}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>@</CInputGroupText>
                                        <CFormInput
                                            placeholder="Email"
                                            autoComplete="email"
                                            feedbackInvalid={errors.email ? errors.email.message : ""}
                                            invalid={errors.email ? true : false}
                                            valid={!errors.email ? true : false}
                                            {...register("email")}
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
                                            valid={!errors.password ? true : false}
                                            {...register("password")}
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Repeat password"
                                            autoComplete="new-password"
                                            feedbackInvalid={errors.repeatPassword ? errors.repeatPassword.message : ""}
                                            invalid={errors.repeatPassword ? true : false}
                                            valid={!errors.repeatPassword ? true : false}
                                            {...register("repeatPassword")}
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="dark" type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? <CSpinner />: "Create Account"}
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

export default Register