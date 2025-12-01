
import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import Home from '../Home/Home/Home'
import Spiner from '../Comeponents/Spiner/Spiner'
import LogIn from '../Pages/LogIn/LogIn'
import Contact from '../Pages/Contact/Contact'
import About from '../Pages/About/About'
import AuthLayOut from '../layouts/AuthLayOut'
import Register from '../Pages/Register/Register'
import RiderFrom from '../Home/Rider/RiderFrom'
import PrivateRoute from './PrivateRoute'
import UserProfile from '../Home/UserProfile/UserProfile'
import SendPercel from '../Pages/SendPercel/SendPercel'
import DashboardLayout from '../layouts/DashboardLayout'
import Mypercel from '../Pages/Dashboard/MyPercel/Mypercel'
import Payment from '../Pages/Dashboard/Payment/Payment'
import PaymentSuccess from '../Pages/Dashboard/PaymentSuccess/PaymentSuccess'
import PaymentCanceled from '../Pages/Dashboard/PaymentCanceled/PaymentCanceled'
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory'
import RiderCheck from '../Pages/Dashboard/RiderCheck/RiderCheck'
import UserMenagment from '../Pages/Dashboard/UserManagement/UserMenagment'
import AdminRoute from './AdminRoute'

export const router = createBrowserRouter([

{
   path: '/',
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {index: true , Component: Home},
      { path:'spiner', Component: Spiner},
      { path:'/contact', Component: Contact},
      { path:'/about', Component: About},
     { path:'/rider' , element:<PrivateRoute>
       <RiderFrom></RiderFrom>
     </PrivateRoute>},
     { path:'/user-profile' , element:<PrivateRoute>
       <UserProfile></UserProfile>
     </PrivateRoute>},
     { path:'/send-percel' , element:<PrivateRoute>
       <SendPercel></SendPercel>
     </PrivateRoute>}
    ]

},
{
  path: '/' ,
  Component: AuthLayOut,
  children: [
    {path:"/login", Component: LogIn},
    { path:"/register", Component: Register}
  ]
},
{
  path: '/dashboard',
  element: <PrivateRoute>
    <DashboardLayout></DashboardLayout>
  </PrivateRoute>,
  children:[
      // {path:'/dashboard' , Component : Mypercel },
      {path:'/dashboard/mypercel' , Component : Mypercel },
     {path:"/dashboard/mypercel/:id", Component: Payment},
     {path:"/dashboard/payment-success", Component: PaymentSuccess},
     {path:"/dashboard/payment-canceled", Component: PaymentCanceled},
     {path:"/dashboard/payment-history", Component: PaymentHistory},
     {path:"/dashboard/user-management", element: <AdminRoute> <UserMenagment></UserMenagment></AdminRoute>},
     {path:"/dashboard/rider-status", Component: RiderCheck}
  ]
}
])
