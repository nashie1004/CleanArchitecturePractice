import { cilSpeedometer, cilDrop, cilPencil, cilStar } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Schedule',
    to: '/schedule',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Workout',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Workout Form',
        to: '/workout/form',
      },
      {
        component: CNavItem,
        name: 'Workout List',
        to: '/workout/list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Exercise',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Exercise List',
        to: '/exercise/list',
      },
      {
        component: CNavItem,
        name: 'Exercise Category List',
        to: '/exercise/category/list',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Others',
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
]

export default nav;