/*
https://github.com/syket-git/react-table/blob/main/src/App.jsx
https://tanstack.com/table/latest/docs/framework/react/examples/basic
*/

import { CButton, CContainer, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CPagination, CPaginationItem, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
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
import { cilMoodGood, cilNotes, cilPencil, cilPhone } from '@coreui/icons';

const mockData = 
    [
        {
            "id": 1,
            "name": "John Doe",
            "email": "johndoe@example.com",
            "phone": "123-456-7890"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "janesmith@example.com",
            "phone": "987-654-3210"
        },
        {
            "id": 3,
            "name": "Michael Johnson",
            "email": "michaeljohnson@example.com",
            "phone": "555-123-4567"
        },
]
const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        header: () => (
            <div className="d-flex align-items-center">
                <CIcon icon={cilMoodGood} size="lg"  />
                <span>Id</span>
            </div>
        ),
    }),

    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
            <div className="d-flex align-items-center">
                <CIcon icon={cilMoodGood} size="lg" />
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
                <CIcon icon={cilNotes} size="lg" />
                <span>Email</span>
            </div>
        ),
    }),
    columnHelper.accessor("phone", {
        header: () => (
            <div className="d-flex align-items-center">
                <CIcon icon={cilPhone} size="lg" />
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
        <>
            <CInputGroup className="mb-3">
                <CInputGroupText >Icon</CInputGroupText>
                <CFormInput placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" />
                <CDropdown alignment="end" variant="input-group">
                    <CDropdownToggle color="dark" >Dropdown</CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem href="#">Action</CDropdownItem>
                        <CDropdownItem href="#">Another action</CDropdownItem>
                        <CDropdownItem href="#">Something else here</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
                <CButton type="button" color="dark" id="button-addon2">Search</CButton>
            </CInputGroup>

            <CTable responsive bordered>
                    <CTableHead>
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
                    <CTableBody >
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
                </CTable>

                    <span >Items per page</span>
                    <CFormSelect 
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </CFormSelect>

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
        </>
    );
}