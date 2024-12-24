import { cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol } from '@coreui/react';
import { WeightMeasurement } from '../../../Utils/enums';
import { DetailFormFields, HeaderFormFields, IFormState, IModalState } from '../WorkoutForm';
import { UseFormReset, UseFormSetValue } from 'react-hook-form';

interface IWorkoutFormTable{
    header: HeaderFormFields;
    setModalState: React.Dispatch<React.SetStateAction<IModalState>>;
    formState: IFormState;
    resetDetail: UseFormReset<DetailFormFields>;
    setValueHeader: UseFormSetValue<HeaderFormFields>
}

export default function WorkoutFormTable({
    header, setModalState, formState
    , resetDetail, setValueHeader
}: IWorkoutFormTable) {
  return (
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
                    onClick={() => {
                        resetDetail(item);
                        setModalState(prev => ({ ...prev, show: true}))
                    }}
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
                    {formState.exerciseDropdown.items.find(i => i.exerciseId == item.exerciseId)?.name}
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
  )
}
