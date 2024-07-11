import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterLayout from './layout/RegisterLayout'
import MainLayout from './layout/MainLayout'
import Profile from './pages/User/pages/Profile'
import { useContext } from 'react'
import { AppContext } from './context/app.context'
import path from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layout/CartLayout'
import UserLayout from './pages/User/layout/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import PurchaseHistory from './pages/User/pages/PurchaseHistory'

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
                    path: path.cart,
                    element: (
                        <CartLayout>
                            <Cart />
                        </CartLayout>
                    )
                },
                {
                    path: path.user,
                    element: (
                        <MainLayout>
                            <UserLayout />
                        </MainLayout>
                    ),
                    children: [
                        {
                            path: path.profile,
                            element: <Profile />
                        },
                        {
                            path: path.changePassword,
                            element: <ChangePassword />
                        },
                        {
                            path: path.purchaseHistory,
                            element: <PurchaseHistory />
                        }
                    ]
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
