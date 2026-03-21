import React, { useState } from 'react'
import axios from "axios"
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const onSubmitHandler = async (e) => {
    try {

      e.preventDefault();
      console.log("Submit clicked")
      const response = await axios.post(backendURL + "/api/user/admin", { email, password })
      // console.log("FULL RESPONSE:", response);
      // console.log("RESPONSE DATA:", response.data);

      if (response.data.success) {
        // console.log("TOKEN RECEIVED:", response.data.token);
        setToken(response.data.token)
        // localStorage.setItem("token", response.data.token);

        // console.log("TOKEN SET IN STATE");

      }
      else {
        toast.error(response.data.message)
        // console.log("NO TOKEN IN RESPONSE");

      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }



  }


  return (


    <div className='h-[80vh] flex items-center justify-center'>


      <form onSubmit={onSubmitHandler} className="flex flex-col justify-center items-center rounded-lg shadow-md w-[90%] border bg-white border-gray-600 p-7 sm:max-w-md mx-auto gap-5">

        {/* Title */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <p className="font-[Alegreya] text-4xl">Admin Panel</p>
          <hr className="w-10 h-[2px] bg-gray-800 border-none" />
        </div>


        {/* Email */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        {/* Password */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        {/* <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer font-[Lora]'>Forgot your password?</p>
        {
          ==="Login"
          ?<p onClick={()=>set("Sign Up")} className='cursor-pointer font-bold font-[Lora]'>Create Account</p>
          :<p onClick={()=>set("Login")} className='cursor-pointer font-bold font-[Lora]'>Login Here</p>
        }

      </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 h-10 py-2 bg-[#FF69B4] text-white text-[16px] font-medium rounded-md hover:bg-pink-500 cursor-pointer transition"
        >
          Sign In
        </button>

      </form>
    </div>
  )
}

export default Login
