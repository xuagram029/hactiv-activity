import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { ToastContainer, toast } from 'react-toastify';
import Encrypt from "./Pages/Encrypt";
import Profile from "./Pages/Profile"


const router = createBrowserRouter([
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/encrypt",
      element: <Encrypt />,
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