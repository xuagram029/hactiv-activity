import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user";

const Reg2 = () => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
        useEffect(() => {
          const checkUser = async() => {
              const res = await axios.get('http://localhost:8800/user')
              setUser(res.data)
          }
          checkUser()
        }, [])    
          
        const traverse = () => {
            const duplicates = user.filter(element => (
              element.name === formik.values.name ||  
              element.mobile === formik.values.mobile ||  
              element.email === formik.values.email 
            ));
            const duplicateFields = [];
            if (duplicates.length > 0) {
              if (duplicates.some(element => element.name === formik.values.name)) {
                duplicateFields.push("Name");
              }
              if (duplicates.some(element => element.mobile === formik.values.mobile)) {
                duplicateFields.push("Mobile Number");
              }
              if (duplicates.some(element => element.email === formik.values.email)) {
                duplicateFields.push("Email");
              }
            }
            return duplicateFields;
          };
        
   const formik = useFormik({
     initialValues: {
       name: '',
       mobile: '',
       email: '',
       address: '',
       gender: '',
       password: '',
       birthdate: '',
     },
     validationSchema: Yup.object({
       name: Yup.string()
         .required('Please Enter a Name'),
       mobile: Yup.number()
         .required('Please Enter Mobile Number'),
       email: Yup.string().email('Invalid email address').required('Please enter your valid Email Address'),
       address: Yup.string()
       .required('Please Enter your Address'),
       password: Yup.mixed()
       .required('Please Enter a Password'),
       birthdate: Yup.date()
       .required('Required'),
     }),
     onSubmit: async (values) => {
        const encryptedPassword = CryptoJS.AES.encrypt(values.password, "Secret Passphrase").toString();
       console.log(encryptedPassword)
        const newUser = {...values, password:encryptedPassword}
        const regUser = JSON.stringify(newUser);
        const duplicateFields = traverse();
        
        if (duplicateFields.length === 3) {
            toast.warning('All given information is already used. Please enter new information.');
          }
            const message = `The following fields are already used: ${duplicateFields.join(", ")}. Please enter new information for these fields.`;
            if (duplicateFields.length > 0) {
              toast.warning(message);
            } else {
              try {
                await axios.post('http://localhost:8800/user', regUser, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                dispatch(registerUser(regUser));
                toast.success('Registered');
                navigate('/login');
              } catch (err) {
                console.error(err);
              }
          };
     },
   });
   return (
     <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600">
         <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
           <h1 className="text-3xl font-bold mb-8 text-center">REGISTER</h1>
           <input
            placeholder='Name'
            className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
             id="name"
             name="name"
             type="text"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.name}
           />
           {formik.touched.name && formik.errors.name ? (
             <div>{formik.errors.name}</div>
           ) : null}
           <input
            placeholder='Mobile Number'
            className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
             id="mobile"
             name="mobile"
             type="text"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.mobile}
           />
           {formik.touched.mobile && formik.errors.mobile ? (
             <div>{formik.errors.mobile}</div>
           ) : null}
           <input
            placeholder='Email Address'
             className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
             id="email"
             name="email"
             type="email"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.email}
           />
           {formik.touched.email && formik.errors.email ? (
             <div>{formik.errors.email}</div>
           ) : null}
           <input
            placeholder='Address'
             className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
             id="address"
             name="address"
             type="address"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.address}
           />
           {formik.touched.address && formik.errors.address ? (
             <div>{formik.errors.address}</div>
           ) : null}
           <input
            placeholder='Gender'
             className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
             id="gender"
             name="gender"
             type="gender"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.gender}
           />
           {formik.touched.gender && formik.errors.gender ? (
             <div>{formik.errors.gender}</div>
           ) : null}
           <input
            placeholder='Password'
             className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
             id="password"
             name="password"
             type="password"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.password}
           />
           {formik.touched.password && formik.errors.password ? (
             <div>{formik.errors.password}</div>
           ) : null}
           <input
            placeholder='Birthday'
             className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
             id="birthdate"
             name="birthdate"
             type="date"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.birthdate}
           />
           {formik.touched.birthdate && formik.errors.birthdate ? (
             <div>{formik.errors.birthdate}</div>
           ) : null}
           <button type="submit" className="block w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-gray-200 font-bold py-2 px-4 rounded mt-4 hover:shadow-lg">Submit</button>
         </form>
        <ToastContainer />

     </div>
   );
}

export default Reg2