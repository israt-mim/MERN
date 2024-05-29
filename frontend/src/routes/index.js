import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import PaymentSuccessPage from '../pages/PaymentSuccess'
import PaymentFailedPage from '../pages/PaymentFailed'
import AllOrders from '../pages/AllOrders'
import DeliveryFee from '../pages/DeliveryFee'
import AdminOverview from '../pages/AdminOverview'
import MyOrders from '../pages/MyOrder'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "my-orders",
                element : <MyOrders />
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "payment-success",
                element : <PaymentSuccessPage/>
            },
            {
                path : "payment-failed",
                element : <PaymentFailedPage/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "",
                        element : <AdminOverview/>
                    },
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "all-orders",
                        element : <AllOrders/>
                    },
                    {
                        path : "deliveryFee",
                        element : <DeliveryFee/>
                    }
                ]
            },
        ]
    }
])


export default router