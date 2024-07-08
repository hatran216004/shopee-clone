import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterLayout from './layout/RegisterLayout'
import MainLayout from './layout/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layout/CartLayout'

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}

const RejectectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElement = () => {
    const elements = useRoutes([
        {
            path: path.home,
            index: true,
            element: (
                <MainLayout>
                    <ProductList />
                </MainLayout>
            )
        },
        {
            path: path.productDetail,
            element: (
                <MainLayout>
                    <ProductDetail />
                </MainLayout>
            )
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: path.profile,
                    element: (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    )
                },
                {
                    path: path.cart,
                    element: (
                        <CartLayout>
                            <Cart />
                        </CartLayout>
                    )
                }
            ]
        },
        {
            path: '',
            element: <RejectectedRoute />,
            children: [
                {
                    path: path.register,
                    element: (
                        <RegisterLayout>
                            <Register />
                        </RegisterLayout>
                    )
                },
                {
                    path: path.login,
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
