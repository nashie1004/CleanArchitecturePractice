import { Route, Routes } from "react-router";


export default function AppContent() {
    return <Routes>
        <Route path="/todo" element={<>todo</> } />
        <Route path="/todo2" element={<>todo2</> } />
    </Routes>
}