import { cilSpeedometer, cilDrop, cilPencil, cilStar } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Schedule',
    to: '/mySchedule',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Workout',
    to: '/workout',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Exercise',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Exercise List',
        to: '/exerciseList',
      },
      {
        component: CNavItem,
        name: 'Exercise Category List',
        to: '/exerciseCategoryList',
      },
    ],
  },
]

export default nav;