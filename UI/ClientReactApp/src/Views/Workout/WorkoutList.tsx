import  { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import useTheme from "../../Hooks/useTheme";
import { CButton, CCol, CContainer, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CProgress, CRow, CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCaretLeft, cilCaretRight, cilPencil, cilPlus, cilSearch, cilTrash } from "@coreui/icons";
import { toast } from "react-toastify";
import { ColDef } from "ag-grid-community"
import { toDateTimeFormat } from "../../Utils/formatters";
import WorkoutService from "../../Services/WorkoutService";
import { NavLink } from "react-router";

const workoutService = new WorkoutService();

const columns: ColDef[] = [
  { field: "", maxWidth: 100, cellRenderer: (p) => {
    const formUrl = `/workout/form/${p.data.workoutHeaderId}`;

    return <div 
      style={{ width: "100%", height: "100%"}}
      className="d-flex justify-content-center align-items-center">
        <NavLink to={formUrl} style={{marginRight: "4px",}} 
        className="d-flex justify-content-center align-items-center"
        >
          <CIcon 
            icon={cilPencil} 
            className="text-success" 
            style={{  cursor: "pointer" }} 
            size="xl" />
        </NavLink>
        <CIcon 
          icon={cilTrash} 
          className="text-danger" 
          style={{  cursor: "pointer" }}
          size="xl"  />
      </div>
  } },
  { field: "workoutHeaderId" ,type: ["centerAligned"]},
  { field: "title" },
  { field: "notes" },
  { field: "startDateTime", valueFormatter: (p) => toDateTimeFormat(p.value) },
  { field: "endDateTime", valueFormatter: (p) => toDateTimeFormat(p.value) },
]

export default function WorkoutList(){
  const {theme} = useTheme();
  const gridRef = useRef();
  const [columnDefs] = useState(columns);
  const [tableState, setTableState] = useState({
    pageSize: 15,
    pageNumber: 1,
    sortBy: "",
    filters: "",
    rowData: [],
    isLoading: false
  })

  async function getData(){
    setTableState(prev => ({ ...prev, isLoading: true}))
    const data = await workoutService.getMany(tableState);
    
    if (!data.isOk){
      toast(data.message, { type: "error" })
      return;
    }

    setTableState(prev => ({
      ...prev,
      isLoading: false,
      rowData: data.data.items
    }));
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

  return (
    <div style={{ height: 500 }} className={theme === "dark" ? "ag-theme-quartz-dark" : "" }>
      <CContainer className="mb-2">
        <CRow xs={{ gutterX: 2, gutterY: 2 }}> 
          <CCol />
          <CCol xs="auto" className="d-flex align-items-center">
            <CInputGroupText >Page: {tableState.pageNumber}</CInputGroupText>
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
                  <NavLink to="/workout/form" style={{ textDecoration: "none", color: "inherit"} }>
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
        onGridReady={getData}
        />
    </div>
  );
};