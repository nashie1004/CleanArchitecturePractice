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
  CSpinner,
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
import { toast, ToastContainer } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useFirstRender from '../../Hooks/useFirstRender';
import WorkoutService from '../../Services/WorkoutService';

const detailSchema = z.object({
  tempRowId: z.number().optional(),
  workoutDetailId: z.number().optional(),
  exerciseId: z.coerce.number().gt(0, "Please select an option"),
  sets: z.coerce.number().gt(0),
  reps: z.coerce.number().gt(0),
  weight: z.coerce.number().gte(0),
  weightMeasurementId: z.coerce.number().gt(0, "Please select an option"),
  remarks: z.string().optional(),
});

const headerSchema = z.object({
  workoutHeaderId: z.number().optional(),
  title: z.string().min(5),
  notes: z.string().optional(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  workoutDetails: z.array(detailSchema)
})

type HeaderFormFields = z.infer<typeof headerSchema>;
type DetailFormFields = z.infer<typeof detailSchema>;

const exerciseService = new ExerciseService();
const workoutService = new WorkoutService();

export default function WorkoutForm(){
  const firstRender = useFirstRender();
  const [modalState, setModalState] = useState({ show: false })
  const [exerciseDropdown, setExerciseDropdown] = useState({ isLoading: false, items: [{ exerciseId: 0, name: "" }] });

  const {
    register: registerHeader, handleSubmit: handleSubmitHeader
    ,formState: { errors: errorsHeader, isSubmitting: isSubmittingHeader }
    ,setValue: setValueHeader, watch: watchHeader
  } = useForm<HeaderFormFields>({
    defaultValues: { workoutDetails: [] },
    resolver: zodResolver(headerSchema)
  })
  
  const {
    register: registerDetail, handleSubmit: handleSubmitDetail
    ,formState: { errors: errorsDetails, isSubmitting: isSubmittingDetail  }
    ,reset: resetDetail
  } = useForm<DetailFormFields>({
    defaultValues: {},
    resolver: zodResolver(detailSchema)
  })

  useEffect(() => {
    async function form(){
      setExerciseDropdown(prev => ({ ...prev, isLoading: true }))
      const res = await exerciseService.getDropdown();
      
      if (!res.isOk){
        toast(res.message, { type: "error" })
        return;
      }
  
      setExerciseDropdown({ isLoading: false, items: res.data.items })
    }

    form();
  }, [])

  const header = watchHeader();

  async function submitHeader(data: HeaderFormFields){
    const res = await workoutService.submitForm(data);
    console.log(res, data)    
    if (!res.isOk) {
      toast(res.message, { type: "error" })
      return;
    } 

    toast("Successfully created workout record. Go to workout list to view newly added record.", {type: "success"})
  }

  async function submitDetail(data: DetailFormFields){
    data.tempRowId = header.workoutDetails.length + 1;
    setValueHeader("workoutDetails", [...header.workoutDetails, data]);
    setModalState({ show: false })
  }

  const loading = isSubmittingDetail || isSubmittingHeader || exerciseDropdown.isLoading;

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
            <CCardBody>
              <ToastContainer autoClose={4000} />
              <CForm className="row g-3" onSubmit={handleSubmitHeader(submitHeader)}>
                <CCol xs={12} className='d-flex justify-content-between align-items-center'>
                  <p className="text-body-secondary small">Workout Header</p>
                  <CButton 
                    color="primary" 
                    type="submit" 
                    className='d-flex align-items-center'
                    disabled={loading}
                    >
                    {loading ? <CSpinner /> : <>
                      <span style={{ paddingRight: ".5rem"}}>Submit</span>
                      <CIcon icon={cilInput} size="xl"/>
                    </> }
                  </CButton>
                </CCol>
                <CCol xs={5}>
                  <CFormLabel htmlFor="title">Name or Title</CFormLabel>
                  <CFormInput 
                    {...registerHeader("title")}
                    feedbackInvalid={errorsHeader.title ? errorsHeader.title.message : ""}
                    invalid={errorsHeader.title ? true : false}
                    valid={!errorsHeader.title && !firstRender ? true : false}
                    placeholder="" />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Start Date Time</CFormLabel>
                  <Datetime 
                    inputProps={
                      errorsHeader.startDateTime ? { 
                      ...registerHeader("startDateTime") 
                      , className: "is-invalid form-control" 
                    } : {
                      ...registerHeader("startDateTime") 
                    }
                  } 
                    />
                    {errorsHeader.startDateTime ? <div 
                  style={{ display: 'block'}}
                  className='invalid-feedback'>{errorsHeader.startDateTime.message}</div> : ""}
                </CCol>
                <CCol md={3}>
                  <CFormLabel>End Date Time</CFormLabel>
                  <Datetime 
                    inputProps={
                      errorsHeader.startDateTime ? { 
                      ...registerHeader("endDateTime") 
                      , className: "is-invalid form-control" 
                    } : {
                      ...registerHeader("endDateTime") 
                    }}
                      />
                  {errorsHeader.endDateTime ? <div 
                  style={{ display: 'block'}}
                  className='invalid-feedback'>{errorsHeader.endDateTime.message}</div> : ""}
                </CCol>
                <CCol xs={12}>
                  <CFormTextarea
                    label="Notes"
                    rows={2}
                    {...registerHeader("notes")}
                    feedbackInvalid={errorsHeader.notes ? errorsHeader.notes.message : ""}
                    invalid={errorsHeader.notes ? true : false}
                    valid={!errorsHeader.notes && !firstRender ? true : false}
                  ></CFormTextarea>
                </CCol>
                <CCol xs={12} className='d-flex justify-content-between align-items-center'>
                  <p className="text-body-secondary small" >Workout Details</p>
                  <CButton 
                    color="primary" 
                    className='d-flex align-items-center' 
                    disabled={loading}
                    onClick={() => setModalState(prev => ({ ...prev, show: true}))}
                    >
                    {loading ? <CSpinner /> : <CIcon icon={cilPlus} size="xl"/>}
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
                            <CTableDataCell>
                              {exerciseDropdown.items.find(i => i.exerciseId == item.exerciseId)?.name}
                            </CTableDataCell>
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
                      autoComplete='exercise'
                      feedbackInvalid={errorsDetails.exerciseId ? errorsDetails.exerciseId.message : "" }
                      invalid={errorsDetails.exerciseId ? true : false}
                      valid={!errorsDetails.exerciseId && !firstRender ? true : false}
                    >
                      <option value={0}>Select...</option>
                      {exerciseDropdown.items.map((item, idx) => {
                        return <option key={idx} value={item.exerciseId}>{item.name}</option>
                      })}
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect
                      {...registerDetail("weightMeasurementId")}
                      feedbackInvalid={errorsDetails.weightMeasurementId ? errorsDetails.weightMeasurementId.message : "" }
                      invalid={errorsDetails.weightMeasurementId ? true : false}
                      valid={!errorsDetails.weightMeasurementId && !firstRender ? true : false} 
                      label="Measurement">
                      <option value={0}>Select...</option>
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
                      feedbackInvalid={errorsDetails.weight ? errorsDetails.weight.message : "" }
                      invalid={errorsDetails.weight ? true : false}
                      valid={!errorsDetails.weight && !firstRender ? true : false} 
                       />
                  </CCol>
                  <CCol md={4}>
                    <CFormInput 
                      {...registerDetail("sets")}
                      label="Sets" 
                      type="number" 
                      feedbackInvalid={errorsDetails.sets ? errorsDetails.sets.message : "" }
                      invalid={errorsDetails.sets ? true : false}
                      valid={!errorsDetails.sets && !firstRender ? true : false} 
                      />
                  </CCol>
                  <CCol md={4}>
                    <CFormInput 
                      {...registerDetail("reps")}
                      label="Reps" 
                      type="number"
                      feedbackInvalid={errorsDetails.reps ? errorsDetails.reps.message : "" }
                      invalid={errorsDetails.reps ? true : false}
                      valid={!errorsDetails.reps && !firstRender ? true : false} 
                       />
                  </CCol>
                  <CCol xs={12}>
                    <CFormTextarea
                      {...registerDetail("remarks")}
                      label="Remarks"
                      rows={2}
                      feedbackInvalid={errorsDetails.remarks ? errorsDetails.remarks.message : "" }
                      invalid={errorsDetails.remarks ? true : false}
                      valid={!errorsDetails.remarks && !firstRender ? true : false} 
                    ></CFormTextarea>
                    {errorsDetails.remarks?.message}
                  </CCol>
                  <CCol xs={12} className='d-flex justify-content-end'>
                    <CButton 
                      color="primary" 
                      disabled={loading}
                      type="submit"
                     >
                        {loading ? <CSpinner /> : "Save"}
                    </CButton>
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
