import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterLayout from './layout/RegisterLayout'
import MainLayout from './layout/MainLayout'
import Profile from './pages/Profile'

const isAuthenticated = true
const ProtectedRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}

const RejectectedRoute = () => {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElement = () => {
    const elements = useRoutes([
        {
            path: '',
            index: true,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            )
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: 'profile',
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                }
            ]
        },
        {
            path: '',
            element: <RejectectedRoute />,
            children: [
                {
                    path: 'register',
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    )
                },
                {
                    path: 'login',
                    element: (
                        <RegisterLayout>
                            <Login />
                        </RegisterLayout>
                    )
                }
            ]
        }
    ])

    return elements
}

export default useRouteElement
