import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Customization = () => {
    return (
        <div className='p-4 flex flex-col items-center gap-3 m-3 mt-5 border-4 border-pink-600'>
            <h1 className='font-[Cardo] font-bold italic text-center text-[20px] sm:text-3xl'>Want your own customized flowers?</h1>
            <div className='flex gap-2 items-center'>
                <p className='font-[Cardo] italic text-center text-[18px] sm:text-2xl'>Dm us on</p>
                <a href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2">
                    <img className='w-[16px] h-[16px]' src={assets.instagram_icon} />
                    <p className='font-[Cardo] sm:text-[17px]'>@_twistnbloom.co</p>
                </a>
            </div>
        </div>

    )
}

export default Customization
