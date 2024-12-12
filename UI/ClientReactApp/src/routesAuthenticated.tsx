import React from "react"

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'))
const MySchedule = React.lazy(() => import('./views/Schedule/MySchedule'))
const MyProfile = React.lazy(() => import('./views/Profile/Profile'))
const WorkoutList = React.lazy(() => import('./views/Workout/WorkoutList'))
const WorkoutForm = React.lazy(() => import('./views/Workout/WorkoutForm'))
const ExerciseList = React.lazy(() => import('./views/Exercise/ExerciseList'))
const ExerciseCategoryList = React.lazy(() => import('./views/Exercise/ExerciseCategoryList'))
const Reports = React.lazy(() => import('./views/Reports/Reports'))
const Audit = React.lazy(() => import('./views/Audit/Audit'))
const LoginHistory = React.lazy(() => import('./views/LoginHistory/LoginHistory'))

const routesAuthenticated = [
    { path: '/', element: Dashboard },
    { path: '/schedule', element: MySchedule },
    { path: '/profile',  element: MyProfile },
    { path: '/workout/list', element: WorkoutList },
    { path: '/workout/form',  element: WorkoutForm },
    { path: '/exercise/list',  element: ExerciseList },
    { path: '/exercise/category/List', element: ExerciseCategoryList },
    { path: '/reports', element: Reports },
    { path: '/audit', element: Audit },
    { path: '/loginHistory', element: LoginHistory },
]

export default routesAuthenticated;