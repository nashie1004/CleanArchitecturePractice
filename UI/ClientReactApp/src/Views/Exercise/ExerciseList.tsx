import  { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import useTheme from "../../Hooks/useTheme";
import { CButton, CCol, CContainer, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CProgress, CRow, CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCaretLeft, cilCaretRight, cilPencil, cilSearch, cilTrash } from "@coreui/icons";
import { toast } from "react-toastify";
import { ColDef } from "ag-grid-community"
import ExerciseService from "../../Services/ExerciseService";
import { useNavigate } from "react-router";
import { toTwentyChars } from "../../Utils/formatters";
import CustomToaster from "../../Components/UI/CustomToaster";

const exerciseService = new ExerciseService();

export default function ExerciseList(){
  const {theme} = useTheme();
  const gridRef = useRef();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({
    show: false,
    exerciseId: 0,
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
      { field: "", maxWidth: 100, cellRenderer: (p: any) => {
        return <div style={{ width: "100%", height: "100%"}} className="d-flex justify-content-center align-items-center">
            <CIcon 
              icon={cilPencil} 
              className="text-dark" 
              style={{  cursor: "pointer", marginRight: "4px" }} 
              onClick={() => navigate(`/exercise/form/${p.data.exerciseId}`)}
              size="xl" />
            <CIcon 
              icon={cilTrash} 
              className="text-danger" 
              style={{  cursor: "pointer" }}
              onClick={() => setModalState({ show: true, exerciseId: p.data.exerciseId, isSubmitting: false })}
              size="xl"  />
          </div>
      } },
      { field: "exerciseId", maxWidth: 100 },
      { field: "name" },
      { field: "description", valueFormatter: (p) => toTwentyChars(p.value) },
      { field: "exerciseCategoryName"  },
      { field: "generatedByUser"  },
    ]
    
    return columns;
  }, [])

  async function getData(){
    setTableState(prev => ({ ...prev, isLoading: true}))
    const data = await exerciseService.getMany(tableState);
    if (!data.isOk){
      setTableState(prev => ({ ...prev, isLoading: false}))
      toast(data.message, { type: "error" })
      return;
    }
    
    setTableState(prev => ({ ...prev, isLoading: false, rowData: data.data.items }));
  }

  async function deleteRecord(){
    setModalState(prev => ({ ...prev, isSubmitting: true }))
    const res = await exerciseService.deleteOne(modalState.exerciseId.toString());
    toast(res.message, { type: res.isOk ? "success" : "error" })
    setModalState({ exerciseId: 0, show: false, isSubmitting: false })
  }

  useEffect(() => {
    getData();
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

  const loading = modalState.isSubmitting;

  return (
    <div style={{ height: 500 }} className={theme === "dark" ? "ag-theme-quartz-dark" : "" }>
      <CustomToaster />
      <CContainer className="mb-2">
        <CRow xs={{ gutterX: 2, gutterY: 2 }}> 
          <CCol>
            <CInputGroup>
              <CInputGroupText id="basic-addon1">
                <CIcon size="lg" icon={cilSearch} />
              </CInputGroupText>
              <CFormInput placeholder="Global search..." aria-label="Username" aria-describedby="username"/>
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
            onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                setTableState(prev => ({
                  ...prev,
                  pageSize: Number(e.target.value)
                }))
            }}
           />
        </CCol>
          <CCol xs="auto" className="d-flex align-items-center">
            <CInputGroupText >Page: {tableState.pageNumber}</CInputGroupText>
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
        onGridReady={getData}
        />

    <CModal
      scrollable
      visible={modalState.show} 
      alignment="center"
      onClose={() => setModalState({ show: false, exerciseId: 0, isSubmitting: false })}
      aria-labelledby="modal"
    >
      <CModalHeader>
        <CModalTitle id="modal">Delete Confirmation</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Are you sure you want to delete this record?</p>
      </CModalBody>
      <CModalFooter>
        <CButton disabled={loading} color="primary" onClick={deleteRecord}>
          {loading ? <CSpinner /> : <>Delete record</>}
        </CButton>
      </CModalFooter>
    </CModal>
    </div>
  );
};