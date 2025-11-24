
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

export const router = createBrowserRouter([

{
   path: '/',
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {index: true , Component: Home},
      { path:'spiner', Component: Spiner},
      // { path:'/login', Component: LogIn},
      { path:'/contact', Component: Contact},
      { path:'/about', Component: About},
     { path:'/rider' , element:<PrivateRoute>
       <RiderFrom></RiderFrom>
     </PrivateRoute>},
     { path:'/user-profile' , element:<PrivateRoute>
       <UserProfile></UserProfile>
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
}
])
