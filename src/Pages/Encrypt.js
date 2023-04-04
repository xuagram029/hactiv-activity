import { useEffect, useState } from "react"
import axios from "axios"
import { enc, AES } from "crypto-js"
import CryptoJS from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Encrypt = () => {
const [user, setUser] = useState()
const mail = {email: 'abc@gmail.com'}

    useEffect(() => {
      const checkUser = async() => {
          const res = await axios.get('http://localhost:8800/user')
          setUser(res.data)
          // console.log(res.data)
      }
      checkUser()
    }, [])

    // const checkUser = async() => {
    //     const res = await axios.get('http://localhost:8800/user')
    //     setUser(res.data)
    //     // console.log(res.data)
    // }
    // setTimeout(() => {
    //   console.log(user)
    // }, 1000)
    // user.map(u => {
    //   if(Object.values(u).includes(mail.email)){
    //     console.log('pareho')
    //   }else{
    //     console.log('hindi pareho')
    //   }
    // })

    // user.map(u => {
    //   if(newUser.email === u.email){
    //     console.log('same email')
    //     return false
    //   }else if(newUser.email !== u.email) {
    //     console.log('email')
    //     return true
    //   }
    // })
  
    // const traverse = async () => {
    //   // const res = Object.entries(user)
    //   const emails = await fetchEmails();
    //   const emailList= emails.map(user => user.email);
    //   console.log(newArray)
    //   if(newArray.includes(email)){
    //     console.log('true')
    //   }else{
    //     console.log('false')
    //     return true
    //   }
    // }
    // const traverse = async () => {
    //     const emails = await fetchEmails();
    //     const emailList = emails.map((user) => user.email);
    //     if (emailList.includes(email)) {
    //       console.log('Email already exists');
    //       return true;
    //     } else {
    //       console.log('Email does not exist');
    //       return false;
    //     }
    //   };

    // const matchCred = (data) => {
    //   user.map(u => {
    //     if(Object.values(u).includes(data.email)){
    //       toast.warning('Please enter the another email')
    //       return false
    //     }else{
    //       return true
    //     }
    //   })
    // }

    
    // let serverUserEmails = []
    // user.map(u => {
    //   serverUserEmails += u.email
    // })
    // console.log(serverUserEmails)

    const notify = () => toast("Wow so easy!");

    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('Male')
    const [password, setPassword] = useState('')
    const [birthdate, setBirthdate] = useState('')
    
    const traverse = () => {
        const duplicates = user.filter(element => (
          element.name === name ||  
          element.mobile === mobile ||  
          element.email === email ||
          element.address === address || 
          element.gender === gender ||
          element.birthdate === birthdate
        ));
        const duplicateFields = [];
        if (duplicates.length > 0) {
          if (duplicates.some(element => element.name === name)) {
            duplicateFields.push("Name");
          }
          if (duplicates.some(element => element.mobile === mobile)) {
            duplicateFields.push("Mobile Number");
          }
          if (duplicates.some(element => element.email === email)) {
            duplicateFields.push("Email");
          }
          if (duplicates.some(element => element.address === address)) {
            duplicateFields.push("Address");
          }
          if (duplicates.some(element => element.gender === gender)) {
            duplicateFields.push("Gender");
          }
          if (duplicates.some(element => element.birthdate === birthdate)) {
            duplicateFields.push("Birthdate");
          }
        }
        return duplicateFields;
      };
      
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        // let checkmessage = 'Please enter another value in ';
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' name';
        }
        if (mobile === null || mobile === '') {
            isproceed = false;
            errormessage += ' mobile';
            
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' email';
        }
        if (address === null || address === '') {
            isproceed = false;
            errormessage += ' address';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' password';
        }
        if (birthdate === null || birthdate === '') {
            isproceed = false;
            errormessage += ' birthdate';
        }

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Please enter the valid email')
            }
        }
        return isproceed;
    }



    const handleSubmit = async(e) => {
        e.preventDefault();
        const encryptedPassword = CryptoJS.AES.encrypt(password, "Secret Passphrase").toString();
        const newUser = { name, mobile, email, address, gender, encryptedPassword, birthdate };
      
        const regUser = JSON.stringify(newUser);
        const duplicateFields = traverse();
      
        if (duplicateFields.length === 6) {
          toast.warning('All given information is already used. Please enter new information.');
        } else if (IsValidate()) {
          const message = `The following fields are already used: ${duplicateFields.join(", ")}. Please enter new information for these fields.`;
          if (duplicateFields.length > 0) {
            toast.warning(message);
          } else {
            await axios.post('http://localhost:8800/user', regUser, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(() => toast.success('Registered'));
            console.log(regUser);
          }
        }
      };

    // const handleSubmit2 = async (e) => {
    //   e.preventDefault()
    //   const bagongUser = {name, mobile, email, address, gender, password, birthdate}
    //   JSON.stringify(bagongUser)
    //   console.log(bagongUser)
    // } 
        
    // const fetch2 = async () => {
    //     const data = await axios.get('http://localhost:8800/user')
    //     validate(data.data)
    // }

    // function isObject(value) {
    //     return (
    //       typeof value === 'object' &&
    //       value !== null &&
    //       !Array.isArray(value)
    //     );
    //   }
    //   if (isObject(serverUsers)) {
    //     // 👇️ this runs
    //     console.log('✅ Value is an object');
    //   } else {
    //     console.log('⛔️ Value is not an object');
    //   }


  return (

    <div className="flex justify-center items-center h-screen bg-slate-500">
        <form className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-center">REGISTER</h1>
            <input className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500" 
                   type="text" value={name} placeholder="Name" onChange={(e) => {setName(e.target.value)}}/>
            <input className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
                   type="text" value={mobile} placeholder="Mobile" onChange={(e) => {setMobile(e.target.value)}}/>
            <input className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
                   type="text" value={email} placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
            <input className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
                   type="text" value={address} placeholder="Address" onChange={(e) => {setAddress(e.target.value)}}/>
            <select className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500" 
                   value={gender} id="" placeholder="Gender" onChange={(e) => {setGender(e.target.value)}}>
                {/* <option disabled selected >Select Gender</option> */}
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
                   type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            <input className="block w-full border-2 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 focus:border-blue-500"
                   type="date" value={birthdate} placeholder="Birthday" onChange={(e) => {setBirthdate(e.target.value)}}/>
            {/* <input type="button" value="SUBMIT" className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 hover:shadow-lg"/> */}
            <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 hover:shadow-lg" onClick={handleSubmit}>SUBMIT</button>
        </form>
        <button onClick={() => traverse()}>CHECK</button>
        {/* <button onClick={handleSubmit2}>CHECK</button> */}
        <ToastContainer />
    </div>
  )
}

export default Encrypt


