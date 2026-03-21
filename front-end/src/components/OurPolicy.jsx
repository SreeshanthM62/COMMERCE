import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex justify-around gap-1 p-4 pt-9 mt-7 bg-pink-100'>
        <div className='flex flex-col gap-1 items-center'>
            <img className='w-13 sm:w-20 mb-4' src={assets.flower_icon}/>
            <p className='font-extrabold italic font-[Alegreya] text-[10px] sm:text-[16px] text-center'>AFFORDABLE AND CUSTOMIZABLE</p>
            <p></p>
        </div>

        <div className='flex flex-col mr-2 gap-1 items-center'>
            <img className="w-13 sm:w-20 mb-4" src={assets.heart_icon}/>
            <p className='font-extrabold italic font-[Alegreya] text-center sm:text-[16px] text-[10px]'>HANDMADE WITH LOVE AND CARE</p>
            <p></p>
        </div>

        <div className='flex flex-col gap-1 items-center'>
            <img className='w-13 sm:w-20 mb-4' src={assets.truck_icon}/>
            <p className='font-extrabold italic font-[Alegreya] text-center sm:text-[16px] text-[10px]'>SHIPPING ALL OVER INDIA</p>
            <p></p>
        </div>


      
    </div>
  )
}

export default OurPolicy
