import AuditService from "../../Services/AuditService";
import { useEffect, useState } from "react";

const authService = new AuditService();

export default function Dashboard() {
    const [data, setData] = useState<any>(null);

    
    return <>
        dashboard component
    </>
}