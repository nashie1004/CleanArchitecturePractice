import { cilInput, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CButton, CSpinner, CFormLabel, CFormInput, CFormTextarea } from '@coreui/react'
import { FieldErrors, UseFormRegister, UseFormReset } from 'react-hook-form';
import { DetailFormFields, emptyDetail, HeaderFormFields, IModalState } from '../WorkoutForm';

interface IWorkoutFormHeaderFields{
    loading: boolean;
    firstRender: boolean;
    registerHeader: UseFormRegister<HeaderFormFields>;
    errorsHeader: FieldErrors<HeaderFormFields>;
    setModalState: React.Dispatch<React.SetStateAction<IModalState>>;
    resetDetail: UseFormReset<DetailFormFields>;
    header: HeaderFormFields
}

export default function WorkoutFormHeaderFields({
    loading, firstRender, registerHeader
    , errorsHeader, setModalState, resetDetail
    , header
} : IWorkoutFormHeaderFields) {

  return (
    <>
        <CCol xs={12} className='d-flex justify-content-between align-items-center'>
                  <p className="text-body-secondary small">Workout Header</p>
                  <CButton 
                    color="primary" 
                    type="submit" 
                    className='d-flex align-items-center'
                    disabled={loading}
                    >
                    {loading ? <CSpinner size="sm" /> : <>
                      <span style={{ paddingRight: ".5rem"}}>{header.workoutHeaderId > 0 ? "Edit" : "Submit"}</span>
                      <CIcon icon={cilInput} size="xl"/>
                    </> }
                  </CButton>
                </CCol>
                <CCol xs={6}>
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
                  <CFormInput 
                    {...registerHeader("startDateTime")}
                    type='datetime-local'
                    feedbackInvalid={errorsHeader.startDateTime ? errorsHeader.startDateTime.message : ""}
                    invalid={errorsHeader.startDateTime ? true : false}
                    valid={!errorsHeader.startDateTime && !firstRender ? true : false}
                    />
                    {errorsHeader.startDateTime ? <div 
                  style={{ display: 'block'}}
                  className='invalid-feedback'>{errorsHeader.startDateTime.message}</div> : ""}
                </CCol>
                <CCol md={3}>
                  <CFormLabel>End Date Time</CFormLabel>
                  <CFormInput 
                    {...registerHeader("endDateTime")}
                    type='datetime-local'
                    feedbackInvalid={errorsHeader.endDateTime ? errorsHeader.endDateTime.message : ""}
                    invalid={errorsHeader.endDateTime ? true : false}
                    valid={!errorsHeader.endDateTime && !firstRender ? true : false}
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
                  <div>
                    <p className="text-body-secondary small" >Workout Details</p>
                    {
                      (errorsHeader.workoutDetails ? errorsHeader.workoutDetails : []).map((i1, idx1) => {
                        return Object.entries(i1).map((i2, idx2) => {
                          console.log(i2)

                          return <div 
                          key={idx2}
                          className='invalid-feedback' 
                          style={{display: "block"}}>
                            {i2[1]?.message}
                        </div>
                        })
                      }) 
                    }
                  </div>
                  <CButton 
                    color="primary" 
                    className='d-flex align-items-center' 
                    disabled={loading}
                    onClick={() => {
                      resetDetail(emptyDetail);
                      setModalState(prev => ({ ...prev, show: true}));
                    }}
                    >
                    {loading ? <CSpinner size="sm" /> : <CIcon icon={cilPlus} size="xl"/>}
                  </CButton>
                </CCol>
    </>
  )
}
