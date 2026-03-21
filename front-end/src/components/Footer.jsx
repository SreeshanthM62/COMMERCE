import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (

        <div>
            <div className='flex flex-col gap-8 sm:grid grid-cols-[3fr_1fr_1fr] m-8 mt-40'>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-[33px] sm:text-5xl text-[#FF69B4] font-[Arizonia] font-bold not-italic'>TwistNBloom</h1>
                    <p className='font-[Alegreya] italic text-[18px]'>Beautiful Handmade Flowers Made With Love And Care</p>
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='font-[Roboto] text-[20px]'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-[15px]'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>

                    </ul>

                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className='font-[Roboto] text-[20px]'>GET IN TOUCH</h1>
                    <p>Email@com</p>
                    <a href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2">
                        <img className='w-[16px] h-[16px]' src={assets.instagram_icon} />
                        <p className='font-[Cardo] sm:text-[17px]'>@_twistnbloom.co</p>
                    </a>
                </div>


            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'> Copyright 2026@twistnbloom.co - All Rights Reserved</p>

            </div>

        </div>
    )
}

export default Footer
