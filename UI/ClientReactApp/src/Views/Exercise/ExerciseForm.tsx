import { cilInfo, cilWarning } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CForm, CCol, CFormInput, CFormSelect, CFormCheck, CButton, CCard, CCardBody, CRow, CAlert, CFormTextarea, CSpinner } from "@coreui/react";
import { z } from "zod";
import ExerciseCategoryService from "../../Services/ExerciseCategoryService";
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import useFirstRender from "../../Hooks/useFirstRender";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import ExerciseService from "../../Services/ExerciseService";

const schema = z.object({
    name: z.string().min(1, "Name must not be empty"),
    description: z.string().min(1, "Description must not be empty"),
    category: z.string().min(1, "Category must not be empty")
});

type FormFields = z.infer<typeof schema>;

const exerciseCategoryService = new ExerciseCategoryService();
const exerciseService = new ExerciseService();


export default function ExerciseForm() {
    const firstRender = useFirstRender();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        isLoading: false,
        rowData: [{ exerciseCategoryId: 0, name: "" }]
    })

    const {
        register, handleSubmit, setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        defaultValues: {

        },
        resolver: zodResolver(schema)
    })

    async function submitForm(data: FormFields) {
        console.log(data)

        const response = await exerciseService.submitForm({
            name: data.name
            , description: data.description
            , exerciseCategoryId: Number(data.category)
            , imageUrl: ""
        });

        if (!response.isOk) {
            toast(response.message, { type: "error" })
            return;
        }

        toast("Successfully created. Go to Exercise list to see newly created record.", { type: "success" })
    }

    async function categoryDropdown() {
        setCategory(prev => ({...prev, isLoading: true}))

        const res = await exerciseCategoryService.getDropdown();

        if (!res.isOk) {
            toast(res.message, { type: "error" })
            setCategory(prev => ({...prev, isLoading: false }))
            return;
        }

        setCategory({ rowData: res.data.items, isLoading: false })
    }

    useEffect(() => {
        categoryDropdown();
    }, [])

    const loading = category.isLoading;

    return (
        <CRow>
            <CCol xs={12}>
                <CCard>
                    <CCardBody>
                        <ToastContainer autoClose={4000} />
                        <CForm className="row g-3" onSubmit={handleSubmit(submitForm)}>
                            <CCol xs={12}>
                                <CAlert color="warning" className="d-flex align-items-center">
                                    <CIcon icon={cilInfo} className="flex-shrink-0 me-2" width={24} height={24} />
                                    <div>Exercises created will be marked as user-generated.</div>
                                </CAlert>
                            </CCol>
                            <CCol md={6}>
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
                            <CCol md={6}>
                                <CFormSelect
                                    id="category"
                                    label="Category"
                                    feedbackInvalid={errors.category ? errors.category.message : ""}
                                    invalid={errors.category ? true : false}
                                    valid={!errors.category && !firstRender ? true : false}
                                    {...register("category")}
                                >
                                    {category.rowData.map((item, idx) => {
                                        return <option key={idx} value={item.exerciseCategoryId}>{item.name}</option>
                                    })}
                                </CFormSelect>
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
                                    {loading ? <CSpinner /> : "Create Submit"}
                                </CButton>
                            </CCol>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

