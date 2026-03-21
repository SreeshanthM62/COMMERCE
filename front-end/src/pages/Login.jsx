import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from "axios"
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendURL } = useContext(ShopContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendURL + "/api/user/register", { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendURL + "/api/user/login", { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          console.log(response.data)
        } else {
          toast.error(response.data.message)
        }


      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-16 gap-5">

      {/* Title */}
      <div className="flex flex-col items-center gap-2 mb-2">
        <p className="font-[Alegreya] text-4xl">{currentState}</p>
        <hr className="w-10 h-[2px] bg-gray-800 border-none" />
      </div>

      {/* Name */}
      {currentState === "Login" ? "" : <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-pink-600"
        required
      />}


      {/* Email */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email address"
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-pink-600"
        required
      />

      {/* Password */}
      <div className='w-full relative'>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className=" w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-pink-600"
          required

        />

        <span
          onClick={()=>setShowPassword(!showPassword)}
          className="absolute right-4 top-3 cursor-pointer">
          {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </span>
      </div>

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState === "LOgin"
          ? <p className='cursor-pointer font-[Lora]'>Forgot your password?</p>
          : <p></p>}

        {
          currentState === "Login"
            ? <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer font-bold font-[Lora]'>Create Account</p>
            : <p onClick={() => setCurrentState("Login")} className='cursor-pointer font-bold font-[Lora]'>Login Here</p>
        }

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-2 h-10 py-2 bg-[#FF69B4] text-white text-[16
        requiredpx] font-medium rounded-md hover:bg-pink-500 cursor-pointer transition"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>

    </form>
  )

}

export default Login
