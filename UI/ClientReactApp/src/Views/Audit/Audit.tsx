import  { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import data from "./testData.json"
import useTheme from "../../Hooks/useTheme";
import { CButton, CCol, CContainer, CFormSelect, CProgress, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilCaretLeft, cilCaretRight } from "@coreui/icons";

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: false,
};

const oneData = 
{
  "make": "Tesla",
  "model": "Model Y",
  "price": 64950,
  "electric": true,
  "month": "June"
};

export default function Audit(){
  const {theme} = useTheme();
  const gridRef = useRef();
  const [rowData, setRowData] = useState([])

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "make",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Tesla",
          "Ford",
          "Toyota",
          "Mercedes",
          "Fiat",
          "Nissan",
          "Vauxhall",
          "Volvo",
          "Jaguar",
        ],
      },
    },
    { field: "model" },
    { field: "price", filter: "agNumberColumnFilter" },
    { field: "electric" },
    {
      field: "month",
      comparator: (valueA, valueB) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const idxA = months.indexOf(valueA);
        const idxB = months.indexOf(valueB);
        return idxA - idxB;
      },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  function addData(){
    setRowData((prev) => [...prev, ...data])
    // const res = gridRef.current.api.applyTransaction({
    //   add: [oneData],
    //   addIndex: 1
    // });
    // console.log(res)
  }

  function onGridReady(params){
// console.log(params)
//     const dataSource = {
//       rowCount: undefined,
//       getRows: (params) => {

//         params.successCallback([oneData, oneData, oneData], 991);
//         console.log("apr")
//       }
//     }
//     params.api.setGridOption("datasource", dataSource);

  }

  function previousPage(){
    // Fetch then gridRef.current.api.paginationGoToNextPage();
  }

  function nextPage(){
    // Fetch then gridRef.current.api.paginationGoToNextPage();
  }

  const loadingCellRenderer = useCallback(() => {
    return {}
  }, []);
  const loadingCellRendererParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  return (
    <div style={{ height: 500 }} className={theme === "dark" ? "ag-theme-quartz-dark" : "" }>
      <CContainer className="mb-2">
        <CRow className="justify-content-end">
          <CCol xs="auto">
            <CButton  color="dark"  onClick={addData}>Search / Add Data</CButton>
          </CCol>
          <CCol xs="auto">
          <CFormSelect 
  aria-label="Default select example"
  options={[
    '15 rows',
    { label: '30 rows', value: 30 },
    { label: '45 rows', value: 45 },
  ]}
/>
          </CCol>
          <CCol xs="auto">
      <CButton color="dark" variant="outline" >
        <CIcon icon={cilCaretLeft} />
      </CButton>

          </CCol>
          <CCol xs="auto">
      <CButton color="dark" >
        <CIcon icon={cilCaretRight} />
      </CButton>

          </CCol>
        </CRow>
      </CContainer>
      <AgGridReact
        suppressPaginationPanel={true}
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        onGridReady={onGridReady}
        loadingCellRenderer={loadingCellRenderer}
        loadingCellRendererParams={loadingCellRendererParams}
      />
    </div>
  );
};