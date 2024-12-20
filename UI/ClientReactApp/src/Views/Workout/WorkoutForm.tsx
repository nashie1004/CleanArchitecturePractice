import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Datetime from "react-datetime";

export default function WorkoutForm(){
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
            <CCardBody>
              <CCol xs={12}>
                <p className="text-body-secondary small">Workout Header</p>
              </CCol>
              <CForm className="row g-3">
                <CCol xs={6}>
                  <CFormLabel htmlFor="title">Name or Title</CFormLabel>
                  <CFormInput id="title" placeholder="" />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Start Date Time</CFormLabel>
                  <Datetime inputProps={{ placeholder: "MM/DD/YYYY HH:MM" }} />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>End Date Time</CFormLabel>
                  <Datetime inputProps={{ placeholder: "MM/DD/YYYY HH:MM" }} />
                </CCol>
                <CCol xs={12}>
                  <CFormTextarea
                    id="notes"
                    label="Notes"
                    rows={2}
                  ></CFormTextarea>
                </CCol>
                <CCol xs={12}>
                  <p className="text-body-secondary small">Workout Details</p>
                </CCol>
                <CCol xs={12}>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Exercise</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Sets</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Reps</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Weight</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow>
                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                        <CTableDataCell>Mark</CTableDataCell>
                        <CTableDataCell>Otto</CTableDataCell>
                        <CTableDataCell>@mdo</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell scope="row">2</CTableHeaderCell>
                        <CTableDataCell>Jacob</CTableDataCell>
                        <CTableDataCell>Thornton</CTableDataCell>
                        <CTableDataCell>@fat</CTableDataCell>
                      </CTableRow>
                      <CTableRow>
                        <CTableHeaderCell scope="row">3</CTableHeaderCell>
                        <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                        <CTableDataCell>@twitter</CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Create
                  </CButton>
                </CCol>
              </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
