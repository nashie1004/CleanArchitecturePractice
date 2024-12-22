import  { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import useTheme from "../../Hooks/useTheme";
import { CButton, CCol, CContainer, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CProgress, CRow, CSpinner } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCaretLeft, cilCaretRight, cilPlus, cilSearch } from "@coreui/icons";
import AuditService from "../../Services/AuditService";
import { toast } from "react-toastify";
import { ColDef } from "ag-grid-community"
import { tableActionFormat, toDateTimeFormat } from "../../Utils/formatters";

const auditService = new AuditService();
const columns: ColDef[] = [
  { field: "auditId", maxWidth: 100 },
  { field: "action", maxWidth: 110, valueFormatter: (p) => tableActionFormat(p.value)},
  { field: "createdDate", valueFormatter: (p) => toDateTimeFormat(p.value) },
  { field: "tableName" },
  { field: "tablePrimaryKey", maxWidth: 165 },
  { field: "newData" },
  { field: "oldData" },
  { field: "lastUpdatedDate", valueFormatter: (p) => toDateTimeFormat(p.value) },
]

export default function Audit(){
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

  async function refresh(){
    setTableState(prev => ({ ...prev, isLoading: true}))
    const data = await auditService.getMany(tableState);
    
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

// Gets filter model via the grid API
// const model = gridRef.current.api.getFilterModel(); 

// Sets the filter model via the grid API
// gridApi.setFilterModel(model);

  const loading = tableState.isLoading;

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