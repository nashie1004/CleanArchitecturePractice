import { CToast, CToastClose, CToastBody, CButton, CToaster } from "@coreui/react"
import { useState, useRef } from "react"

interface Toaster {
    message: string
}

export default function Toaster({ message }: Toaster) {
    const [toast, addToast] = useState<any>(null)
    const toaster = useRef()
    const exampleToast = (
        <CToast color="dark" className="text-white align-items-center">
            <div className="d-flex">
                <CToastBody>{message}</CToastBody>
                <CToastClose className="me-2 m-auto" white />
            </div>
        </CToast>
    )
    return (
        <>
            <CButton color="primary" onClick={() => addToast(exampleToast)}>Send a toast</CButton>
            <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
        </>
    )
}