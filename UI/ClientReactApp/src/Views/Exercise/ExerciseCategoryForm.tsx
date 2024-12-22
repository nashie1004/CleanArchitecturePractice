import { cilInfo, cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CForm, CCol, CFormInput, CFormSelect, CFormCheck, CButton, CCard, CCardBody, CRow, CAlert, CFormTextarea, CSpinner } from "@coreui/react";
import { z } from "zod";
import ExerciseCategoryService from "../../Services/ExerciseCategoryService";
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import useFirstRender from "../../Hooks/useFirstRender";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import CustomToaster from "../../Components/UI/CustomToaster";

const schema = z.object({
    exerciseCategoryId: z.number().optional().default(0),
    name: z.string().min(1, "Name must not be empty"),
    description: z.string().min(1, "Description must not be empty"),
    generatedBy: z.string().optional()
});

type FormFields = z.infer<typeof schema>;

const exerciseCategoryService = new ExerciseCategoryService();

function ExerciseCategoryForm() {
    const firstRender = useFirstRender();
    const { exerciseCategoryId } = useParams()
    const [formState, setFormState] = useState({
        isLoading: false
    });

    const {
        register, handleSubmit,
        formState: { errors, isSubmitting }, reset
    } = useForm<FormFields>({
        defaultValues: {
           exerciseCategoryId: 0,
           name: "",
           description: ""
        },
        resolver: zodResolver(schema)
    })

    async function submitForm(data: FormFields) {
        const response = await exerciseCategoryService.submitForm({
            exerciseCategory: data
        });

        if (!response.isOk) {
            toast(response.message, { type: "error" })
            return;
        }

        toast(response.message, { type: "success" })
    }

    useEffect(() => {
        async function init(){
            setFormState({ isLoading: true })

            if (exerciseCategoryId){
                const res = await exerciseCategoryService.getOne(exerciseCategoryId);
                
                if (!res.isOk) {
                    toast(res.message, { type: "error" })
                    setFormState({ isLoading: false })
                    return;
                }
                
                reset(res.data.exerciseCategory)
            }

            setFormState({ isLoading: false })
        }

        init();
    }, [])

    const loading = isSubmitting || formState.isLoading;

    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardBody>
                        <CustomToaster />
                        <CForm className="row g-3" onSubmit={handleSubmit(submitForm)}>
                            <CCol xs={12}>
                                <CAlert color="warning" className="d-flex align-items-center">
                                    <CIcon icon={cilInfo} className="flex-shrink-0 me-2" width={24} height={24} />
                                    <div>Exercise categories created will be marked as user-generated.</div>
                                </CAlert>
                            </CCol>
                            <CCol md={12}>
                                <CFormInput
                                    type="name"
                                    id="name"
                                    label="Name"
                                    feedbackInvalid={errors.name ? errors.name.message : ""}
                                    invalid={errors.name ? true : false}
                                    valid={!errors.name && !firstRender ? true : false}
                                    {...register("name")}
                                />
                            </CCol>
                           
                            <CCol xs={12}>
                                <CFormTextarea
                                    label="Description"
                                    id="description"
                                    style={{ height: '100px' }}
                                    feedbackInvalid={errors.description ? errors.description.message : ""}
                                    invalid={errors.description ? true : false}
                                    valid={!errors.description && !firstRender ? true : false}
                                    {...register("description")}
                                ></CFormTextarea>
                            </CCol>
                           
                            <CCol xs={12} className="">
                                <CButton
                                    color="primary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? <CSpinner size="sm" /> : "Submit"}
                                </CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
  );
}

export default ExerciseCategoryForm;
