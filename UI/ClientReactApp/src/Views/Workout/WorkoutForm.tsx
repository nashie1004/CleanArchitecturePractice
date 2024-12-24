import { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CForm, CRow, } from '@coreui/react'
import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useFirstRender from '../../Hooks/useFirstRender';
import WorkoutService from '../../Services/WorkoutService';
import { useParams } from 'react-router';
import CustomToaster from '../../Components/UI/CustomToaster';
import WorkoutFormModal from './Components/WorkoutFormModal';
import WorkoutFormTable from './Components/WorkoutFormTable';
import WorkoutFormHeaderFields from './Components/WorkoutFormHeaderFields';
import ExerciseService from '../../Services/ExerciseService';

const detailSchema = z.object({
  tempRowId: z.number().optional(),
  workoutDetailId: z.number().optional().default(0),
  exerciseId: z.coerce.number().gt(0, "Please select an option"),
  sets: z.coerce.number().gt(0),
  reps: z.coerce.number().gt(0),
  weight: z.coerce.number().gte(0),
  weightMeasurementId: z.coerce.number().gt(0, "Please select an option"),
  remarks: z.string().optional(),
});

const headerSchema = z.object({
  workoutHeaderId: z.number().optional().default(0),
  title: z.string().min(5),
  notes: z.string().optional(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  workoutDetails: z.array(detailSchema)
})
.superRefine(({ startDateTime, endDateTime }, ctx) => {
  if (startDateTime > endDateTime) {
      ctx.addIssue({
          code: "custom",
          message: "Start Date Time cannot be greater than End Date Time",
          path: ['startDateTime']
      });
  }
});



export type HeaderFormFields = z.infer<typeof headerSchema>;
export type DetailFormFields = z.infer<typeof detailSchema>;
export interface IModalState{ show: boolean } 
export interface IFormState{ workoutHeader: IWorkoutHeader; exerciseDropdown: IExerciseDropdown }
interface IWorkoutHeader{ isLoading: boolean; }
interface IItems{ exerciseId: number, name: string }
interface IExerciseDropdown{ isLoading: boolean, items: IItems[] }

const exerciseService = new ExerciseService();
const workoutService = new WorkoutService();

export const emptyHeader: HeaderFormFields = {  workoutHeaderId: 0, title: "", notes: "", startDateTime: new Date(), endDateTime: new Date(), workoutDetails: [] }
export const emptyDetail: DetailFormFields = { tempRowId: 0, workoutDetailId: 0, exerciseId: 0, sets: 0, reps: 0, weight: 0, weightMeasurementId: 0, remarks: "", }
const emptyFormState: IFormState = { workoutHeader: { isLoading: false }, exerciseDropdown: { isLoading: false, items: [{ exerciseId: 0, name: "" }] } }

export default function WorkoutForm(){
  const { workoutHeaderId } = useParams()
  const firstRender = useFirstRender();
  const [modalState, setModalState] = useState<IModalState>({ show: false })
  const [formState, setFormState] = useState<IFormState>(emptyFormState);

  const {
    register: registerHeader, handleSubmit: handleSubmitHeader
    ,formState: { errors: errorsHeader, isSubmitting: isSubmittingHeader }
    ,setValue: setValueHeader, watch: watchHeader, reset: resetHeader
  } = useForm<HeaderFormFields>({
    defaultValues: emptyHeader,
    resolver: zodResolver(headerSchema)
  })
  
  const {
    register: registerDetail, handleSubmit: handleSubmitDetail
    ,formState: { errors: errorsDetails, isSubmitting: isSubmittingDetail  }
    ,reset: resetDetail
  } = useForm<DetailFormFields>({
    defaultValues: emptyDetail,
    resolver: zodResolver(detailSchema)
  })

  useEffect(() => {
    async function init(){

      setFormState({ 
        workoutHeader: { isLoading: true },
        exerciseDropdown: { isLoading: true, items: [] },
      })

      if (workoutHeaderId){
        const res = await workoutService.getOne(Number(workoutHeaderId));

        if (!res.isOk){
          toast(res.message, { type: "error" })
          return;
        }

        const workoutHeader = res.data.workoutHeader as HeaderFormFields;

        resetHeader(workoutHeader);
      }

      const res = await exerciseService.getDropdown();
      
      if (!res.isOk){
        toast(res.message, { type: "error" })
        return;
      }

      setFormState({ 
        workoutHeader: { isLoading: false },
        exerciseDropdown: { items: res.data.items, isLoading: false },
      })
    }

    init();
  }, [])

  const header = watchHeader();

  async function submitHeader(data: HeaderFormFields){
    const res = await workoutService.submitForm({ workoutHeader: data });
      
    if (!res.isOk) {
      toast(res.message, { type: "error" })
      return;
    } 

    toast("Successfully created workout record. Go to workout list to view newly added record.", {type: "success"})
  }

  async function submitDetail(data: DetailFormFields){
    data.tempRowId = header.workoutDetails.length + 1;
    setValueHeader("workoutDetails", [...header.workoutDetails, data]);
    resetDetail(emptyDetail);
    setModalState({ show: false })
  }

  const loading = isSubmittingDetail 
  || isSubmittingHeader 
  || formState.exerciseDropdown.isLoading 
  || formState.workoutHeader.isLoading;

  // console.log(errorsHeader.workoutDetails)
  // console.log(header.startDateTime, header.endDateTime)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
            <CCardBody>
              <CustomToaster />
              <CForm className="row g-3" onSubmit={handleSubmitHeader(submitHeader)}>
                <WorkoutFormHeaderFields 
                  loading={loading}
                  firstRender={firstRender}
                  registerHeader={registerHeader}
                  errorsHeader={errorsHeader}
                  setModalState={setModalState}
                  resetDetail={resetDetail}
                  header={header}
                />  
                <WorkoutFormTable 
                  header={header}
                  setModalState={setModalState}
                  formState={formState}
                  resetDetail={resetDetail}
                  setValueHeader={setValueHeader}
                />
              </CForm>
              <WorkoutFormModal 
                submitDetail={submitDetail}
                modalState={modalState}
                setModalState={setModalState}
                registerDetail={registerDetail}
                handleSubmitDetail={handleSubmitDetail}
                errorsDetails={errorsDetails}
                formState={formState}
                firstRender={firstRender}
                loading={loading}
              />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
