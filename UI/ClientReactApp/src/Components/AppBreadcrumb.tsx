import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import routes from "../routesAuthenticated"
import { useLocation } from 'react-router-dom'

export default function AppBreadcrumb(){
   const location = useLocation().pathname
   const breadCrumbs = routes.find((i) => i.path === location)?.breadCrumb  

    return <>
        <CBreadcrumb className="my-0">
            {breadCrumbs?.map((i, idx) => {
                return <CBreadcrumbItem key={idx}>{i}</CBreadcrumbItem>
            })}
        </CBreadcrumb>
    </>
}

