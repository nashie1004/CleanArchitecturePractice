import React from "react"

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'))
const MySchedule = React.lazy(() => import('./views/Schedule/MySchedule'))
const MyProfile = React.lazy(() => import('./views/Profile/Profile'))
const WorkoutList = React.lazy(() => import('./views/Workout/WorkoutList'))
const WorkoutForm = React.lazy(() => import('./views/Workout/WorkoutForm'))
const ExerciseList = React.lazy(() => import('./views/Exercise/ExerciseList'))
const ExerciseCategoryList = React.lazy(() => import('./views/Exercise/ExerciseCategoryList'))
const Reports = React.lazy(() => import('./views/Reports/Reports'))


const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/mySchedule', name: 'My Schedule', element: MySchedule },
    { path: '/myProfile', name: 'My Profile', element: MyProfile },
    { path: '/workout/list', name: 'Workout List', element: WorkoutList, exact: true },
    { path: '/workout/form', name: 'Workout Form', element: WorkoutForm, exact: true },
    { path: '/exercise/list', name: 'Exercise List', element: ExerciseList, exact: true },
    { path: '/exercise/category/List', name: 'Exercise Category List', element: ExerciseCategoryList, exact: true },
    { path: '/reports', name: 'Reports', element: Reports },
]

export default routes;