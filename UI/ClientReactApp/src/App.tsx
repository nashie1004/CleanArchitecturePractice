import './Assets/App.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import SidebarContext from './Context/SidebarContext'
import './Assets/style.scss'
import './Assets/examples.scss'
import routesPages from './routesPages'
import AuthContext from './Context/AuthContext'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
// import "ag-grid-community/styles/ag-grid.css"
// import "ag-grid-community/styles/ag-theme-quartz.css"

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
      <SidebarContext>
        <AuthContext>
            <BrowserRouter>
            <Routes>
                {routesPages.map((item, idx) => {
                return <Route 
                    key={idx}
                    path={item.path}
                    element={item.element}
                />
                })}
            </Routes>
        </BrowserRouter>
        </AuthContext>
      </SidebarContext>
  )
}

export default App
