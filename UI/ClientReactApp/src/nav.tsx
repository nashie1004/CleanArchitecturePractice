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
        name: 'List',
        to: '/exercise/list',
      },
      {
        component: CNavItem,
        name: 'Form',
        to: '/exercise/form',
      },
      {
        component: CNavItem,
        name: 'Category List',
        to: '/exercise/category/list',
      },
      {
        component: CNavItem,
        name: 'Category Form',
        to: '/exercise/category/form',
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
  {
    component: CNavItem,
    name: 'Audit Logs',
    to: '/audit',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Login History',
    to: '/loginHistory',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
]

export default nav;