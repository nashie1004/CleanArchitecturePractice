import AppContent from "../Components/AppContent";
import AppFooter from "../Components/AppFooter";
import AppHeader from "../Components/AppHeader";
import AppSidebar from "../Components/AppSidebar";

export default function DefaultLayout() {
    return <>
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    Todo here &nbsp;
                    <AppContent />
                </div>
                <AppFooter />
            </div>
        </div>
    </>
}