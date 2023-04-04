import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { ToastContainer, toast } from 'react-toastify';
import Encrypt from "./Pages/Encrypt";


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