import  { useMemo, useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import data from "./testData.json"
import useTheme from "../../Hooks/useTheme";
import { CButton, CProgress } from "@coreui/react";

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

    const res = gridRef.current.api.applyTransaction({
      add: [oneData],
      addIndex: 1
    });
    console.log(res)
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

  return (
    <div style={{ height: 500 }} className={theme === "dark" ? "ag-theme-quartz-dark" : "" }>
      <CButton className="mb-2" color="primary" onClick={addData}>Search / Add Data</CButton>
      
      <AgGridReact
        // rowModelType="infinite"
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        onGridReady={onGridReady}
      />
    </div>
  );
};