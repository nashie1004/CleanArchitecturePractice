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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const detailSchema = z.object({
  tempRowId: z.number(),
  workoutDetailId: z.number(),
  exerciseId: z.number(),
  sets: z.number(),
  reps: z.number(),
  weight: z.number(),
  weightMeasurementId: z.number(),
  remarks: z.string(),
});

const headerSchema = z.object({
  workoutHeaderId: z.number(),
  title: z.string(),
  notes: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  workoutDetails: z.array(detailSchema)
})

type HeaderFormFields = z.infer<typeof headerSchema>;
type DetailFormFields = z.infer<typeof detailSchema>;

const exerciseService = new ExerciseService();

export default function WorkoutForm(){
  const [modalState, setModalState] = useState({
    show: false
  })
  
  const {
    register: registerHeader, handleSubmit: handleSubmitHeader
    ,reset: resetHeader, formState: { isSubmitting }
    ,setValue: setValueHeader, watch: watchHeader
  } = useForm<HeaderFormFields>({
    defaultValues: { 
      workoutDetails: [
        { tempRowId: 1, sets: 3, reps: 30, weight: 40, weightMeasurementId: 1, remarks: "remarks 1", exerciseId: 0, workoutDetailId: 0 }
        ,{ tempRowId: 2, sets: 3, reps: 30, weight: 40, weightMeasurementId: 2, remarks: "remarks 2", exerciseId: 0, workoutDetailId: 0,  }
        ,{ tempRowId: 3, sets: 3, reps: 30, weight: 40, weightMeasurementId: 2, remarks: "remarks 2", exerciseId: 0, workoutDetailId: 0,  }
        ,{ tempRowId: 4, sets: 3, reps: 30, weight: 40, weightMeasurementId: 1, remarks: "remarks 2", exerciseId: 0, workoutDetailId: 0, }
      ]
    },
    resolver: zodResolver(headerSchema)
  })
  
  const {
    register: registerDetail, handleSubmit: handleSubmitDetail
  } = useForm<DetailFormFields>({
    defaultValues: {},
    resolver: zodResolver(detailSchema)
  })

  const [exerciseDropdown, setExerciseDropdown] = useState({
    isLoading: false,
    items: [{ exerciseId: 0, name: "" }]
  });

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

  const header = watchHeader();

  async function submitHeader(data: HeaderFormFields){
    console.log(data)
  }

  async function submitDetail(data: DetailFormFields){
    console.log(data)
  }

  const loading = isSubmitting || exerciseDropdown.isLoading;

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
            <CCardBody>
              <CForm className="row g-3" onSubmit={handleSubmitHeader(submitHeader)}>
                <CCol xs={12} className='d-flex justify-content-between align-items-center'>
                  <p className="text-body-secondary small">Workout Header</p>
                  <CButton color="primary" type="submit" className='d-flex align-items-center'>
                    <span style={{ paddingRight: ".5rem"}}>Submit</span>
                    <CIcon icon={cilInput} size="xl"/>
                  </CButton>
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="title">Name or Title</CFormLabel>
                  <CFormInput 
                    {...registerHeader("title")}
                    placeholder="" />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Start Date Time</CFormLabel>
                  <Datetime 
                    inputProps={{ placeholder: "mm/dd/yyyy hh:mm", ...registerHeader("startDateTime") }} 
                    />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>End Date Time</CFormLabel>
                  <Datetime 
                    inputProps={{ placeholder: "mm/dd/yyyy hh:mm", ...registerHeader("endDateTime") }} />
                </CCol>
                <CCol xs={12}>
                  <CFormTextarea
                    id="notes"
                    label="Notes"
                    rows={2}
                    {...registerHeader("notes")}
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
                      {header.workoutDetails.map((item, idx) => {
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
                                  setValueHeader("workoutDetails", header.workoutDetails.filter(i => i.tempRowId !== item.tempRowId))
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
                <CForm className="row g-3" onSubmit={handleSubmitDetail(submitDetail)}>
                  <CCol md={8}>
                    <CFormSelect 
                      {...registerDetail("exerciseId")} 
                      label="Exercise"
                    >
                      {exerciseDropdown.items.map((item, idx) => {
                        return <option key={idx} value={item.exerciseId}>{item.name}</option>
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect
                      {...registerDetail("weightMeasurementId")} 
                      label="Measurement">
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
                    <CFormInput
                      {...registerDetail("weight")} 
                      label="Weight" 
                      type='number'
                       />
                  </CCol>
                  <CCol md={4}>
                    <CFormInput 
                      {...registerDetail("sets")}
                      label="Sets" 
                      type="number" 
                      />
                  </CCol>
                  <CCol md={4}>
                    <CFormInput 
                      {...registerDetail("reps")}
                      label="Reps" 
                      type="number"
                       />
                  </CCol>
                  <CCol xs={12}>
                    <CFormTextarea
                      {...registerDetail("remarks")}
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
