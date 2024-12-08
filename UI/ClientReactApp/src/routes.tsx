import React from "react"

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'))
const MySchedule = React.lazy(() => import('./views/Schedule/MySchedule'))
const Workout = React.lazy(() => import('./views/Workout/WorkoutForm'))
const ExerciseList = React.lazy(() => import('./views/Exercise/ExerciseList'))
const ExerciseCategoryList = React.lazy(() => import('./views/Exercise/ExerciseCategoryList'))


const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/mySchedule', name: 'My Schedule', element: MySchedule },
    { path: '/workout', name: 'My Workout', element: Workout, exact: true },
    { path: '/exerciseList', name: 'Exercise List', element: ExerciseList, exact: true },
    { path: '/exerciseCategoryList', name: 'Exercise Category List', element: ExerciseCategoryList, exact: true },
]

export default routes;