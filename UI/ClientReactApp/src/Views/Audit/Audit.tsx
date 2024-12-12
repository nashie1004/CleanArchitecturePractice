import { CSpinner } from "@coreui/react";
import AuditService from "../../Services/AuditService";
import { useEffect, useState } from "react";

const authService = new AuditService();

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

        getData();
    }, [])

    return <>
    <CSpinner/> 
        dashboard component
        {data !== null ? JSON.stringify(data) : "no data"}
    </>
}