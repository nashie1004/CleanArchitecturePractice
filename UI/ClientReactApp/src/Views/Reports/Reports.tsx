import { CListGroup, CListGroupItem } from "@coreui/react";
import { NavLink } from "react-router";

const reportsList = [
    { name: "Geeral Profile Info", link: "/1" },
    { name: "Detailed Workouts Report List", link: "/2" },
    { name: "Exercise List", link: "/3" },
    { name: "Exercise Category List", link: "/5" }
]

export default function Reports(){
    return <>
        <CListGroup>
            {
                reportsList.map((item, idx) => {
                    return <CListGroupItem key={idx}  >
                        <NavLink to={`/reports/${item.link}`} style={{ textDecoration: "none" }}>
                            {item.name}
                        </NavLink>
                    </CListGroupItem>
                })
            }
            
        </CListGroup>
    </>
}