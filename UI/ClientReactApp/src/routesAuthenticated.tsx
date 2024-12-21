import React from "react"

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'))
const MySchedule = React.lazy(() => import('./views/Schedule/MySchedule'))
const MyProfile = React.lazy(() => import('./views/Profile/Profile'))
const WorkoutList = React.lazy(() => import('./views/Workout/WorkoutList'))
const WorkoutForm = React.lazy(() => import('./views/Workout/WorkoutForm'))
const ExerciseList = React.lazy(() => import('./views/Exercise/ExerciseList'))
const ExerciseForm = React.lazy(() => import('./views/Exercise/ExerciseForm'))
const ExerciseCategoryList = React.lazy(() => import('./views/Exercise/ExerciseCategoryList'))
const ExerciseCategoryForm = React.lazy(() => import('./views/Exercise/ExerciseCategoryForm'))
const Reports = React.lazy(() => import('./views/Reports/Reports'))
const Audit = React.lazy(() => import('./views/Audit/Audit'))
const LoginHistory = React.lazy(() => import('./views/LoginHistory/LoginHistory'))

const routesAuthenticated = [
    { 
        path: '/', 
        element: Dashboard, 
        breadCrumb: ["Dashboard"]
    },
    { 
        path: '/schedule', 
        element: MySchedule,
        breadCrumb: ["Schedule"]
    },
    { 
        path: '/profile',  
        element: MyProfile,
        breadCrumb: ["Profile"] 
    },
    { 
        path: '/workout/list',
        element: WorkoutList,
        breadCrumb: ["Workout", "List"]
    },
    { 
        path: '/workout/form',  
        element: WorkoutForm,
        breadCrumb: ["Workout", "Form"] 
    },
    { 
        path: '/workout/form/:workoutHeaderId',  
        element: WorkoutForm,
        breadCrumb: ["Workout", "Form"] 
    },
    { 
        path: '/exercise/list', 
        element: ExerciseList,
        breadCrumb: ["Exercise", "List"] 
    },
    {
        path: '/exercise/form',
        element: ExerciseForm,
        breadCrumb: ["Exercise", "Form"]
    },
    {
        path: '/exercise/form/:exerciseId',
        element: ExerciseForm,
        breadCrumb: ["Exercise", "Form"]
    },
    { 
        path: '/exercise/category/list', 
        element: ExerciseCategoryList,
        breadCrumb: ["Exercise", "Category", "List"] 
    },
    { 
        path: '/exercise/category/form', 
        element: ExerciseCategoryForm,
        breadCrumb: ["Exercise", "Category", "Form"] 
    },
    { 
        path: '/exercise/category/form/:exerciseCategoryId', 
        element: ExerciseCategoryForm,
        breadCrumb: ["Exercise", "Category", "Form"] 
    },
    { 
        path: '/reports', 
        element: Reports,
        breadCrumb: ["Others", "Reports"] 
    },
    { 
        path: '/audit', 
        element: Audit,
        breadCrumb: ["Others", "Audit Logs"]
    },
    // { 
    //     path: '/loginHistory', 
    //     element: LoginHistory,
    //     breadCrumb: ["Others", "Login History"]
    // },
]

export default routesAuthenticated;