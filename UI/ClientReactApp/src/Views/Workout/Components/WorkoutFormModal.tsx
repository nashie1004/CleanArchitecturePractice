import { CModal, CModalHeader, CModalTitle, CModalBody, CForm, CCol, CFormSelect, CFormInput, CFormTextarea, CButton, CSpinner } from '@coreui/react'
import { WeightMeasurement } from '../../../Utils/enums'
import React from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { DetailFormFields, IFormState, IModalState } from '../WorkoutForm';


interface IWorkoutFormModal{
    submitDetail: (data: any) => Promise<void>;
    modalState: IModalState;
    setModalState: React.Dispatch<React.SetStateAction<IModalState>>;
    registerDetail: UseFormRegister<DetailFormFields>;
    handleSubmitDetail: UseFormHandleSubmit<DetailFormFields>;
    errorsDetails: FieldErrors<DetailFormFields>;
    formState: IFormState;
    firstRender: boolean;
    loading: boolean;
}

export default function WorkoutFormModal({
    submitDetail, modalState, setModalState
    ,registerDetail, handleSubmitDetail, errorsDetails
    ,formState, firstRender, loading
}: IWorkoutFormModal) {
  return (
    <CModal
                size="xl"
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
                      {formState.exerciseDropdown.items.map((item, idx) => {
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
                          { value: WeightMeasurement.None, label: "None" }
                          ,{ value: WeightMeasurement.Kilogram, label: "Kilogram" }
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
                        {loading ? <CSpinner size="sm" /> : "Save"}
                    </CButton>
                  </CCol>
                </CForm>
                </CModalBody>
              </CModal>
  )
}
