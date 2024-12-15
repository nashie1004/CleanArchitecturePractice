/*
https://github.com/syket-git/react-table/blob/main/src/App.jsx
https://tanstack.com/table/latest/docs/framework/react/examples/basic
*/

import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CPagination, CPaginationItem, CRow, CTable, CTableBody, CTableCaption, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import AuditService from "../../Services/AuditService"
import CIcon  from '@coreui/icons-react';
import { cilFilter, cilMoodGood, cilNotes, cilPencil, cilPhone, cilSearch, cilSend, cilTrash } from '@coreui/icons';

const mockData = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `John Doe ${index + 1}`,
    email: `johndoe${index + 1}@example.com`,
    phone: `123-456-78${String(index).padStart(2, '0')}`
}))
const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => <div className="d-flex justify-content-around">
            <CButton color="primary" size="sm">
                <CIcon icon={cilPencil} size="lg"   />
            </CButton>
            <CButton color="danger" size="sm" style={{'--ci-primary-color': 'white'}}>
                <CIcon icon={cilTrash} size="lg"  />
            </CButton>
        </div>,
        header: () => (
            <div className="d-flex align-items-center justify-content-center">
                <span>Action</span>
            </div>
        ),
    }),

    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
            <div className="d-flex align-items-center">
                <span>Name</span>
            </div>
        ),
    }),
    columnHelper.accessor("email", {
        id: "email",
        cell: (info) => (
            <span >{info.getValue()}</span>
        ),
        header: () => (
            <div className="d-flex align-items-center">
                <span>Email</span>
            </div>
        ),
    }),
    columnHelper.accessor("phone", {
        header: () => (
            <div className="d-flex align-items-center">
                <span>Phone</span>
            </div>
        ),
        cell: (info) => info.getValue(),
    }),
];

const auditService = new AuditService();

export default function Audit() {
    const [data] = useState(() => [...mockData]);
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const [testData, setTestData] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            const res = await auditService.getMany({
                pageNumber: 1,
                pageSize: 5,
                filters: "",
                sortBy: ""
            });
            if (res.isOk) {
                setTestData(res.data)
                console.log(res)
            }
        }

        //getData();
    }, [])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        getCoreRowModel: getCoreRowModel(),

        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
    });

    console.log(table.getRowModel());

    return (
        <CCard>
            <CCardHeader>
                <b>Audit List</b>
            </CCardHeader>
            <CCardBody>
                <CContainer className="mb-3">
                    <CRow xs={{gutterX: 2}} className="justify-content-end">
                        <CCol xs={4}>
                            <CFormInput placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" />
                        </CCol>
                        <CCol xs="auto">
                            <CDropdown alignment="end" variant="input-group">
                                <CDropdownToggle color="dark" >
                                    <CIcon icon={cilFilter} size="lg" />
                                </CDropdownToggle>
                                <CDropdownMenu>
                                    <CDropdownItem href="#">Action</CDropdownItem>
                                    <CDropdownItem href="#">Another action</CDropdownItem>
                                    <CDropdownItem href="#">Something else here</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol xs="auto">
                            <CButton type="button" color="dark" id="button-addon2">
                                <CIcon icon={cilSearch} size="lg" />
                            </CButton>
                        </CCol>
                    </CRow>
                </CContainer>

                <CContainer> 
                        <CTable borderColor="success" responsive bordered hover striped  >
                            <CTableHead >
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <CTableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <CTableHeaderCell
                                                    scope="col"
                                                    key={header.id}
                                                >
                                                    <div
                                                        {...{
                                                            onClick: header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </div>
                                                </CTableHeaderCell>
                                            ))}
                                        </CTableRow>
                                    ))}
                            </CTableHead>
                            <CTableBody style={{ height: "300px", overflowY: "scroll"}}> 
                                {table.getRowModel().rows.map((row) => (
                                    <CTableRow key={row.id} >
                                        {row.getVisibleCells().map((cell) => (
                                            <CTableDataCell
                                                key={cell.id}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </CTableDataCell>
                                        ))}
                                    </CTableRow>
                                ))}
                            </CTableBody>
                            <CTableCaption>
                                <span>
                                    Showing 0 out of 100 records
                                </span>
                            </CTableCaption>
                        </CTable>
                </CContainer>

                <CContainer>
                    <CRow className="justify-content-between">
                        <CCol xs="auto">
                            <CFormSelect 
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                                >
                                    {[5, 10, 20, 30].map((pageSize) => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize} rows
                                        </option>
                                    ))}
                            </CFormSelect>
                        </CCol>
                        <CCol xs="auto">
                            <CPagination aria-label="Page navigation example">
                                <CPaginationItem
                                    aria-label="Last"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </CPaginationItem>
                                <CPaginationItem
                                    aria-label="Previous"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </CPaginationItem>
                                <CPaginationItem>1</CPaginationItem>
                                <CPaginationItem>2</CPaginationItem>
                                <CPaginationItem>3</CPaginationItem>
                                <CPaginationItem
                                    aria-label="Next"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </CPaginationItem>
                                <CPaginationItem
                                    aria-label="End"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </CPaginationItem>
                            </CPagination>
                        </CCol>
                    </CRow>
                </CContainer>
            </CCardBody>
            {/* 
                <span >
                    <input
                        min={1}
                        max={table.getPageCount()}
                        type="number"
                        value={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            table.setPageIndex(page);
                        }}
                    />
                    <span >of {table.getPageCount()}</span>
                </span>
            */}
        </CCard>
    );
}