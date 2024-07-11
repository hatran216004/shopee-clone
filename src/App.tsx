import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import useRouteElement from './useRouteElement'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './context/app.context'

function App() {
    const routeElements = useRouteElement()
    const { reset } = useContext(AppContext)
    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearLS', reset)
        return () => {
            LocalStorageEventTarget.removeEventListener('clearLS', reset)
        }
    }, [reset])

    return (
        <>
            {routeElements}
            <ToastContainer />
        </>
    )
}

export default App
