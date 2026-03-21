import React from 'react'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between'>
      <div className=" sm:text-center sm:justify-center sm:items-center text-left px-4 py-3 title">

        <h1 className='text-[33px] w-auto sm:text-5xl'>TwistNBloom</h1>

      </div>

      <button onClick={()=>setToken("")} className='py-2 h-12 px-7 mt-4 mr-2 bg-[#FF69B4] text-white rounded-full text-center cursor-pointer'>
        Logout
      </button>


    </div>
  )
}

export default Navbar
