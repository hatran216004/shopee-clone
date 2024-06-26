import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'

function App() {
    const routeElements = useRouteElement()
    return (
        <>
            {routeElements}
            <ToastContainer />
        </>
    )
}

export default App
