import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from "../features/login";


const Login = () => {
  const [eom, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get(`http://localhost:8800/user/`);
        const data = response.data;
        const user = data.find((user) => user.email === eom || user.mobile === eom);
        if (user) {
          const userPassword = CryptoJS.AES.decrypt(user.encryptedPassword, "Secret Passphrase");
          const decryptedPassword = userPassword.toString(CryptoJS.enc.Utf8);
          if (password === decryptedPassword) {
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
  };


  // const ProceedLoginusingAPI = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     ///implentation
  //     // console.log('proceed');
  //     let inputobj = { username: username, password: password };
  //     fetch("https://localhost:44308/User/Authenticate", {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify(inputobj),
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((resp) => {
  //         console.log(resp);
  //         if (Object.keys(resp).length === 0) {
  //           toast.error("Login failed, invalid credentials");
  //         } else {
  //           toast.success("Success");
  //           sessionStorage.setItem("username", username);
  //           sessionStorage.setItem("jwttoken", resp.jwtToken);
  //           usenavigate("/");
  //         }
  //         // if (Object.keys(resp).length === 0) {
  //         //     toast.error('Please Enter valid username');
  //         // } else {
  //         //     if (resp.password === password) {
  //         //         toast.success('Success');
  //         //         sessionStorage.setItem('username',username);
  //         //         usenavigate('/')
  //         //     }else{
  //         //         toast.error('Please Enter valid credentials');
  //         //     }
  //         // }
  //       })
  //       .catch((err) => {
  //         toast.error("Login Failed due to :" + err.message);
  //       });
  //   }
  // };

  const validate = () => {
    let result = true;
    if (eom === "" || eom === null) {
      result = false;
      toast.warning("Please Enter Email or Mobile Number");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Your Password");
    }
    return result;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600">
      <form className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">LOGIN FORM</h1>
        <input
          className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
          type="text"
          value={eom}
          onChange={(e) => setEmailOrMobile(e.target.value)}
          placeholder="Email or Mobile Number"
        />
        <input
          className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="block w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-gray-200 font-bold py-2 px-4 rounded mt-4 hover:shadow-lg"
          onClick={proceedLogin}
        >
          LOGIN
        </button>
        <p className="mt-4 text-sm text-gray-600">
          Not registered yet?{' '}
            <Link to="/register" class="text-blue-600 hover:text-blue-800 font-medium">Click here to register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
