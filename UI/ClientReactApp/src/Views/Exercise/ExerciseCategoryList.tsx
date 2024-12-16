import { cilWarning } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CAlert } from "@coreui/react"
import { useState } from "react"

export default function ExerciseCategoryList() {
    const [showModal, setShowModal] = useState(false)


    return <>
        exercise category list component

        <CButton color="primary" onClick={() => setShowModal(prev => !prev)}>Vertically centered modal</CButton>
        <CModal
            alignment="center"
            visible={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="VerticallyCenteredExample"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">Modal title</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CAlert color="warning" className="d-flex align-items-center" dismissible>
                    <CIcon icon={cilWarning} className="flex-shrink-0 me-2" width={24} height={24} />
                    <div>An example warning alert with an icon</div>
                </CAlert>

                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setShowModal(false)}>
                    Close
                </CButton>
                <CButton color="primary">Save changes</CButton>
            </CModalFooter>
        </CModal>
    </>
}