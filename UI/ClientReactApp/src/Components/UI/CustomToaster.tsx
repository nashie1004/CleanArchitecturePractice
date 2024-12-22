import { ToastContainer } from 'react-toastify'
import useTheme from '../../Hooks/useTheme';

export default function CustomToaster() {
    const {theme} = useTheme();

  return (
    <>
        <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "dark" ? "dark" : "colored"}
            />
    </>
  )
}
