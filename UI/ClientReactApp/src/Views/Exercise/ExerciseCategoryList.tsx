import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import useTheme from "../../Hooks/useTheme";
import { CButton, CCol, CContainer, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CProgress, CRow, CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCaretLeft, cilCaretRight, cilPencil, cilPlus, cilSearch, cilTrash } from "@coreui/icons";
import { toast } from "react-toastify";
import ExerciseCategoryService from "../../Services/ExerciseCategoryService";
import { NavLink, useNavigate } from "react-router";
import { toTwentyChars } from "../../Utils/formatters";
import { ColDef } from "ag-grid-community"

const exerciseCategoryService = new ExerciseCategoryService();

export default function ExerciseCategoryList() {
    const { theme } = useTheme();
    const gridRef = useRef();
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({
      show: false,
      exerciseCategoryId: 0,
      isSubmitting: false
    });
    const [tableState, setTableState] = useState({
        pageSize: 15,
        pageNumber: 1,
        sortBy: "",
        filters: "",
        rowData: [],
        isLoading: false
    })

    const columnDefs = useMemo(() => {
        const columns: ColDef[] = [
            { field: "", maxWidth: 100, cellRenderer: (p:any) => {
                return <div style={{ width: "100%", height: "100%"}} className="d-flex justify-content-center align-items-center">
                    <CIcon 
                        icon={cilPencil} 
                        className="text-dark" 
                        style={{  cursor: "pointer", marginRight: "4px"  }} 
                        onClick={() => navigate(`/exercise/category/form/${p.data.exerciseCategoryId}`)}
                        size="xl" />
                    <CIcon 
                      icon={cilTrash} 
                      className="text-danger" 
                      style={{  cursor: "pointer" }}
                      onClick={() => setModalState({ show: true, exerciseCategoryId: p.data.exerciseId, isSubmitting: false })}
                      size="xl"  />
                  </div>
              } },
            { field: "exerciseCategoryId", maxWidth: 180 },
            { field: "name" },
            { field: "description" , valueFormatter: (p) => toTwentyChars(p.value) },
            { field: "generatedByUser" },
        ]
        return columns;
    }, [])

    async function refresh() {
        setTableState(prev => ({ ...prev, isLoading: true }))
        const data = await exerciseCategoryService.getMany(tableState);
        if (!data.isOk) {
            toast(data.message, { type: "error" })
            setTableState(prev => ({ ...prev, isLoading: false }))
            return;
        }

        setTableState(prev => ({ ...prev, isLoading: false, rowData: data.data.items }));
    }

    useEffect(() => {
        refresh();
    }, [
        tableState.pageSize, tableState.pageNumber,
        tableState.sortBy, tableState.filters,
    ])

    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
        };
    }, []);

  const loading = false || modalState.isSubmitting || tableState.isLoading;

    return (
        <div style={{ height: 500 }} className={theme === "dark" ? "ag-theme-quartz-dark" : ""}>
            <CContainer className="mb-2">
                <CRow xs={{ gutterX: 2, gutterY: 2 }}>
                    <CCol>
                        <CInputGroup>
                            <CInputGroupText id="basic-addon1">
                                {loading ? <CSpinner size="sm" /> : <CIcon  icon={cilSearch} />}
                            </CInputGroupText>
                            <CFormInput 
                                disabled={loading}
                                placeholder="Global search..." 
                                aria-label="Username" 
                                aria-describedby="username" />
                        </CInputGroup>
                    </CCol>
                    <CCol xs="auto">
                        <CFormSelect
                            aria-label="Default select example"
                            options={[
                                { label: '15 rows', value: "15" },
                                { label: '30 rows', value: "30" },
                                { label: '45 rows', value: "45" },
                            ]}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setTableState(prev => ({
                                    ...prev,
                                    pageSize: Number(e.target.value)
                                }))
                            }}
                        />
                    </CCol>
                    <CCol xs="auto" className="d-flex align-items-center">
                        <CInputGroupText>Page: {tableState.pageNumber}</CInputGroupText>
                    </CCol>
                    <CCol xs="auto" className="">
                        <CButton
                            color="secondary"
                            onClick={() => {
                                setTableState(prev => ({
                                    ...prev,
                                    pageNumber: Math.max(prev.pageNumber - 1, 1)
                                }))
                            }}
                        >
                            <CIcon icon={cilCaretLeft} />
                        </CButton>
                    </CCol>
                    <CCol xs="auto">
                        <CButton
                            color="secondary"
                            onClick={() => {
                                setTableState(prev => ({
                                    ...prev,
                                    pageNumber: prev.pageNumber + 1
                                }))
                            }}
                        >
                            <CIcon icon={cilCaretRight} />
                        </CButton>
                    </CCol>
                    <CCol xs="auto">
                        <CButton color="secondary">
                            <NavLink to="/exercise/category/form" style={{ textDecoration: "none", color: "inherit"} }>
                                <span className="">Add Item </span>
                                <CIcon icon={cilPlus} />
                            </NavLink>
                        </CButton>
                    </CCol>
                </CRow>
            </CContainer>

            <AgGridReact
                suppressPaginationPanel={true}
                ref={gridRef}
                rowData={tableState.rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={tableState.pageSize}
                paginationPageSizeSelector={[15, 30, 45]}
                onGridReady={refresh}
            />
        </div>
    );
};