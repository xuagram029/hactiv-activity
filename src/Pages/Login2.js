import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from "../features/login";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
        oem: '',
        password: '',
    },
    validationSchema: Yup.object({
      oem: Yup.string()
        .required('Please Enter Email or Mobile Number'),
        password: Yup.string()
        .required('Please Enter your password'),
    }),
    onSubmit: async (values) => {
        try {
            const response = await axios.get(`http://localhost:8800/user/`);
            const data = response.data;
            const user = data.find((user) => user.email === values.oem || user.mobile === values.oem);
            console.log(data)
            if (user) {
              const userPassword = CryptoJS.AES.decrypt(user.password, "Secret Passphrase");
              const decryptedPassword = userPassword.toString(CryptoJS.enc.Utf8);
              if (values.password === decryptedPassword) {
                  dispatch(loginSuccess(user))
                  toast.success('Success');
                  navigate('/profile')
              } else {
                dispatch(loginFailure("Password doesn't match"));
                toast.error("Password doesn't match");
              }
            } else {
              dispatch(loginFailure('User does not exist'));
              toast.error('User does not exist');
            }
          } catch (error) {
            console.error(error);
            dispatch(loginFailure('Error occurred while fetching user data'));
            toast.error('Error occurred while fetching user data');
          }
    }
})

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">LOGIN FORM</h1>
        <input
         className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
         id="oem"
         name="oem"
         type="oem"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.oem}
       />
       {formik.touched.oem && formik.errors.oem ? (
         <div>{formik.errors.oem}</div>
       ) : null}  
        <input
          className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password ? (
             <div>{formik.errors.password}</div>
        ) : null}        
        <button
          className="block w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-gray-200 font-bold py-2 px-4 rounded mt-4 hover:shadow-lg"
          type="submit"
        >
          LOGIN
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Not registered yet?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">Click here to register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login2;
