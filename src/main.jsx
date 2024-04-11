import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './root/Root';
import Home from './component/Home';
import About from './component/About';
import Service from './component/Service';
import Blog from './component/Blog';
import Contact from './component/Contact';
import NotFound from './component/NotFound';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Forget from './component/Forget/Forget';
import Context from './provider/Context';
import Protect from './component/Protect/Protect';
// import Profile from './component/profile/Profile';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/service",
        element: <Service></Service>
      },
      {
        path: "/blog",
        element: <Protect>
          <Blog></Blog>
        </Protect>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
      },
      // {
      //   path: "/profile",
      //   element: <Profile></Profile>
      // },
      {
        path: "/sign",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/forget",
        element: <Forget></Forget>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={router}></RouterProvider>
    </Context>
  </React.StrictMode>,
)
