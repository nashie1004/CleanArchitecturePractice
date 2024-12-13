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
import React from "react";

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
            <span>
                ID
            </span>
        ),
    }),

    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => (
            <span >
                Name
            </span>
        ),
    }),
    columnHelper.accessor("email", {
        id: "email",
        cell: (info) => (
            <span >{info.getValue()}</span>
        ),
        header: () => (
            <span >
                 Email
            </span>
        ),
    }),
    columnHelper.accessor("phone", {
        header: () => (
            <span >
                 Phone
            </span>
        ),
        cell: (info) => info.getValue(),
    }),
];

export default function Audit() {
    const [data] = React.useState(() => [...mockData]);
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

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
            <>
                <CInputGroup className="mb-3">
                    <CInputGroupText >Icon</CInputGroupText>
                    <CFormInput placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1" />
                    <CDropdown alignment="end" variant="input-group">
                        <CDropdownToggle color="primary" variant="outline">Dropdown</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem href="#">Action</CDropdownItem>
                            <CDropdownItem href="#">Another action</CDropdownItem>
                            <CDropdownItem href="#">Something else here</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    <CButton type="button" color="primary" variant="outline"  id="button-addon2">Search</CButton>
                </CInputGroup>
            </>

            <CTable responsive >
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
        </>
    );
}
/*
import * as React from 'react'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { CButton, CTable, CTableBody, CTableCaption, CTableDataCell, CTableHead, CTableRow } from '@coreui/react'

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
    columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor(row => row.lastName, {
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: info => info.column.id,
    }),
]

export default function Audit() {
    const [data, _setData] = React.useState(() => [...defaultData])
    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <CTable responsive striped >
                <CTableCaption>List of users</CTableCaption>
                <CTableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <CTableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <CTableDataCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableHead>
                <CTableBody>
                    {table.getRowModel().rows.map(row => (
                        <CTableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <CTableDataCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableBody>
                <CTableHead>
                    {table.getFooterGroups().map(footerGroup => (
                        <CTableRow key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <CTableDataCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </CTableDataCell>
                            ))}
                        </CTableRow>
                    ))}
                </CTableHead>
            </CTable>
            <div className="h-4" />
            <CButton onClick={() => rerender()} className="border p-2">
                Rerender
            </CButton>
        </>
    )
}
*/

/*

export default function Audit() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            const res = await authService.getMany({
                pageNumber: 1,
                pageSize: 5,
                filters: "",
                sortBy: ""
            });
            if (res.isOk) {
                setData(res.data)
                console.log(res)
            }
        }

        //getData();
    }, [])

    return <>
    <CSpinner/> 
        dashboard component
        {data !== null ? JSON.stringify(data) : "no data"}
    </>
}
*/