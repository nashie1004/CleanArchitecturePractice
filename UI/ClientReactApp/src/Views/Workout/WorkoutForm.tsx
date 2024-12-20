import { act, useEffect, useReducer, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CProgress,
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
import { WeightMeasurement } from '../../Utils/enums';
import ExerciseService from '../../Services/ExerciseService';
import { toast } from 'react-toastify';

interface IFormState{
  workoutHeaderId: number
  title: string
  notes: string
  startDateTime: Date
  endDateTime: Date
  workoutDetails: IDetail[]
}

interface IDetail{
  tempRowId: number
  workoutDetailId: number
  exerciseId: number
  sets: number
  reps: number
  weight: number
  weightMeasurementId: number
  remarks: string
}

type IAction = { type: "setDetails", payload: IDetail[] } 

function formReducer(state: IFormState, action: IAction){
  switch(action.type){
    case "setDetails":
      return { ...state, workoutDetails: [] }
    default:
      return state;
  }
}

const exerciseService = new ExerciseService();

export default function WorkoutForm(){
  const [modalState, setModalState] = useState({
    show: false
  })

  const [exerciseDropdown, setExerciseDropdown] = useState({
    isLoading: false,
    items: [{ exerciseId: 0, name: "" }]
  });

  const [formState, formDispatch] = useReducer(formReducer, {
    workoutHeaderId: 0,
    title: "",
    notes: "",
    startDateTime: new Date(),
    endDateTime: new Date(),
    workoutDetails: [
      { tempRowId: 1, sets: 3, reps: 30, weight: 40, weightMeasurementId: 1, remarks: "remarks 1", exerciseId: 0, workoutDetailId: 0 }
      ,{ tempRowId: 2, sets: 3, reps: 30, weight: 40, weightMeasurementId: 2, remarks: "remarks 2", exerciseId: 0, workoutDetailId: 0,  }
      ,{ tempRowId: 3, sets: 3, reps: 30, weight: 40, weightMeasurementId: 2, remarks: "remarks 2", exerciseId: 0, workoutDetailId: 0,  }
      ,{ tempRowId: 4, sets: 3, reps: 30, weight: 40, weightMeasurementId: 1, remarks: "remarks 2", exerciseId: 0, workoutDetailId: 0, }
    ]
  })

  async function getExerciseDropdown(){
    setExerciseDropdown(prev => ({ ...prev, isLoading: true }))
    const res = await exerciseService.getDropdown();
    
    if (!res.isOk){
      toast(res.message, { type: "error" })
      return;
    }

    setExerciseDropdown({ isLoading: false, items: res.data.items })
  }

  useEffect(() => {
    getExerciseDropdown();
  }, [])

  const loading = false;

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
                  <Datetime inputProps={{ placeholder: "mm/dd/yyyy hh:mm" }} />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>End Date Time</CFormLabel>
                  <Datetime inputProps={{ placeholder: "mm/dd/yyyy hh:mm" }} />
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
                  <CButton 
                    color="primary" 
                    className='d-flex align-items-center' 
                    onClick={() => setModalState(prev => ({ ...prev, show: true}))}
                    >
                    <CIcon icon={cilPlus} size="xl"/>
                  </CButton>
                </CCol>
                <CCol xs={12}>
                  <CTable>
                    <CTableHead>
                      <CTableRow>
                        {[
                          "", "Exercise", "Weight"
                          , "Measurement", "Sets", "Reps"
                          , "Remarks"
                        ].map((item, idx) => {
                          return <CTableHeaderCell key={idx} scope="col">{item}</CTableHeaderCell>
                        })}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {formState.workoutDetails.map((item, idx) => {
                        return <CTableRow key={idx}>
                            <CTableHeaderCell className='d-flex justify-content-center' scope='row'>
                              <div 
                                style={{paddingRight: '.6rem', cursor: "pointer"}}
                                onClick={() => setModalState(prev => ({ ...prev, show: true}))}
                              >
                                <CIcon className="text-secondary" icon={cilPencil} size="lg"/>
                              </div>
                              <div 
                                style={{ cursor: "pointer"}}
                                onClick={() => {
                                  formDispatch({ 
                                    type: "setDetails", 
                                    payload: formState.workoutDetails.filter(i => i.tempRowId !== item.tempRowId) 
                                  })
                                }}
                              >
                                <CIcon className="text-danger" icon={cilTrash} size="lg"/>
                              </div>
                            </CTableHeaderCell>
                            <CTableDataCell>{item.exerciseId}</CTableDataCell>
                            <CTableDataCell>{item.weight}</CTableDataCell>
                            <CTableDataCell>
                              {item.weightMeasurementId === WeightMeasurement.Kilogram ? "Kilogram" : "Pounds"}
                            </CTableDataCell>
                            <CTableDataCell>{item.sets}</CTableDataCell>
                            <CTableDataCell>{item.reps}</CTableDataCell>
                            <CTableDataCell>{item.remarks}</CTableDataCell>
                        </CTableRow>
                      })} 
                    </CTableBody>
                  </CTable>
                </CCol>
              </CForm>
              <CModal
                alignment="center"
                visible={modalState.show}
                onClose={() => setModalState(prev => ({ ...prev, show: false}))}
                aria-labelledby="modal"
              >
                <CModalHeader>
                  <CModalTitle id="modal">Workout Detail Form</CModalTitle>
                </CModalHeader>
                <CModalBody>
                <CForm className="row g-3">
                  <CCol md={8}>
                    <CFormSelect label="Exercise">
                      {exerciseDropdown.items.map((item, idx) => {
                        return <option key={idx} value={item.exerciseId}>{item.name}</option>
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect label="Measurement">
                      {
                        [
                          { value: WeightMeasurement.Kilogram, label: "Kilogram" }
                          ,{ value: WeightMeasurement.Pounds, label: "Pounds" }
                        ].map((item, idx) => {
                          return <option key={idx} value={item.value}>{item.label}</option>
                        })
                      }
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormInput label="Weight" type='number' />
                  </CCol>
                  <CCol md={4}>
                    <CFormInput label="Sets" type="number" />
                  </CCol>
                  <CCol md={4}>
                    <CFormInput label="Reps" type="number" />
                  </CCol>
                  <CCol xs={12}>
                    <CFormTextarea
                      label="Remarks"
                      rows={2}
                    ></CFormTextarea>
                  </CCol>
                  <CCol xs={12} className='d-flex justify-content-end'>
                    <CButton color="primary" onClick={() => setModalState(prev => ({ ...prev, show: false}))}>Save</CButton>
                  </CCol>
                </CForm>
                </CModalBody>
              </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
