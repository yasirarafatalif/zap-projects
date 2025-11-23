
import { createBrowserRouter } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import Home from '../Home/Home/Home'
import Spiner from '../Comeponents/Spiner/Spiner'
import LogIn from '../Pages/LogIn/LogIn'
import Contact from '../Pages/Contact/Contact'
import About from '../Pages/About/About'

export const router = createBrowserRouter([

{
   path: '/',
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {index: true , Component: Home},
      { path:'spiner', Component: Spiner},
      { path:'/login', Component: LogIn},
      { path:'/contact', Component: Contact},
      { path:'/about', Component: About}
    ]

}
])
