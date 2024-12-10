import AuditService from "../../Services/AuditService";
import { useEffect, useState } from "react";

const authService = new AuditService();

export default function Dashboard() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            const res = await authService.getMany();
            if (res.isOk) {
                setData(res.data)
            console.log(res.data.items)
            }

        }

        getData();
    }, [])
    
    return <>
        dashboard component
        {data !== null ? JSON.stringify(data) : "no data" }
    </>
}