import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Datetime from "react-datetime";
import { cilInput, cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

interface IDetail{
  sets: number
  reps: number
  weight: number
  weightMeasurementId: number
  remarks: string
  exerciseId: number
  workoutHeaderId: number
  workoutDetailId: number
}

export default function WorkoutForm(){
  const [details, setDetails] = useState<IDetail[]>([
    { sets: 3, reps: 30, weight: 40, weightMeasurementId: 1, remarks: "remarks 1", exerciseId: 0, workoutDetailId: 0, workoutHeaderId: 0 }
    ,{ sets: 3, reps: 30, weight: 40, weightMeasurementId: 1, remarks: "remarks 2", exerciseId: 0, workoutDetailId: 0, workoutHeaderId: 0 }
  ]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
            <CCardBody>
              <CForm className="row g-3">
                <CCol xs={12} className='d-flex justify-content-between align-items-center'>
                  <p className="text-body-secondary small">Workout Header</p>
                  <CButton color="primary" type="submit" className='d-flex align-items-center'>
                    <span style={{ paddingRight: ".5rem"}}>Submit</span>
                    <CIcon icon={cilInput} size="xl"/>
                  </CButton>
                </CCol>
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
                <CCol xs={12} className='d-flex justify-content-between align-items-center'>
                  <p className="text-body-secondary small" >Workout Details</p>
                  <CButton color="primary" className='d-flex align-items-center'>
                    <CIcon icon={cilPlus} size="xl"/>
                  </CButton>
                </CCol>
                <CCol xs={12}>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                        <CTableHeaderCell scope="col">Exercise</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Weight</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Measurement</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Sets</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Reps</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Remarks</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {details.map((item, idx) => {
                        return <CTableRow key={idx}>
                            <CTableHeaderCell className='d-flex justify-content-center' scope='row'>
                              <div style={{paddingRight: '.6rem', cursor: "pointer"}}>
                                <CIcon className="text-secondary" icon={cilPencil} size="lg"/>
                              </div>
                              <div style={{ cursor: "pointer"}}>
                                <CIcon className="text-danger" icon={cilTrash} size="lg"/>
                              </div>
                            </CTableHeaderCell>
                            <CTableDataCell>{item.exerciseId}</CTableDataCell>
                            <CTableDataCell>{item.weight}</CTableDataCell>
                            <CTableDataCell>{item.weightMeasurementId}</CTableDataCell>
                            <CTableDataCell>{item.sets}</CTableDataCell>
                            <CTableDataCell>{item.reps}</CTableDataCell>
                            <CTableDataCell>{item.remarks}</CTableDataCell>
                        </CTableRow>
                      })} 
                    </CTableBody>
                  </CTable>
                </CCol>
              </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
