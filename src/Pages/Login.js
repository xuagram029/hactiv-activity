import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get(`http://localhost:8800/user/${username}`);
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error(error);
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
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username or Number");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Your Password");
    }
    return result;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500">
      <form className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">LOGIN FORM</h1>
        <input
          className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Mobile"
        />
        <input
          className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 hover:shadow-lg"
          onClick={proceedLogin}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
