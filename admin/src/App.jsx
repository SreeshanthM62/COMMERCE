import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

import { ToastContainer, toast } from 'react-toastify';

export const backendURL = import.meta.env.VITE_BACKEND_URL

export const currency = "₹"




const App = () => {

  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])
  
  
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>

      {token === ""
        ?<Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-[75%]'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-y text-gray-600 text-base'>
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>

        </>}


    </div>
  )

}

export default App
