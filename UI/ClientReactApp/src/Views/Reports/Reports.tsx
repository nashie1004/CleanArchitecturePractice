import { CListGroup, CListGroupItem } from "@coreui/react";
import { NavLink } from "react-router";

const reportsList = [
    { name: "Report name #1", link: "/1" },
    { name: "Report name #2", link: "/2" },
    { name: "Report name #3", link: "/3" },
    { name: "Report name #4", link: "/4" },
    { name: "Report name #5", link: "/5" }
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