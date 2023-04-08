import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { ToastContainer } from 'react-toastify';
import Profile from "./Pages/Profile"
import Home from "./Pages/Home";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
const App = () => {
  return (
    <div>
        <ToastContainer theme="colored"/>
         <RouterProvider router={router} />
    </div>
  )
}

export default App