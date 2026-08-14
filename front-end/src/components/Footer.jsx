import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="mt-40">

            {/* Main Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-10 px-8 py-12 border-t border-gray-300">

                {/* Brand */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-[33px] sm:text-5xl text-[#FF69B4] font-[Arizonia] font-bold not-italic">
                        TwistNBloom
                    </h1>

                    <p className="font-[Alegreya] italic text-[18px] max-w-sm leading-7">
                        Beautiful Handmade Flowers Made With Love And Care
                    </p>

                    <p className="text-sm text-gray-600 max-w-sm leading-6 mt-2">
                        Thoughtfully handmade flowers and gifts created to make
                        your special moments more memorable.
                    </p>
                </div>


                {/* Company */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-[Roboto] text-[20px]">
                        COMPANY
                    </h2>

                    <ul className="flex flex-col gap-2 text-[15px] text-gray-700">

                        <li>
                            <Link
                                to="/"
                                className="hover:text-[#FF69B4] transition"
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/about"
                                className="hover:text-[#FF69B4] transition"
                            >
                                About Us
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-[#FF69B4] transition"
                            >
                                Contact Us
                            </Link>
                        </li>

                    </ul>
                </div>


                {/* Customer / Legal */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-[Roboto] text-[20px]">
                        INFORMATION
                    </h2>

                    <ul className="flex flex-col gap-2 text-[15px] text-gray-700">


                        <li>
                            <Link
                                to="/terms-and-conditions"
                                className="hover:text-[#FF69B4] transition"
                            >
                                Terms & Conditions
                            </Link>
                        </li>


                        <li>
                            <Link
                                to="/refund-policy"
                                className="hover:text-[#FF69B4] transition"
                            >
                                Returns & Refunds
                            </Link>
                        </li>

                    </ul>
                </div>


                {/* Get In Touch */}
                <div className="flex flex-col gap-4">

                    <h2 className="font-[Roboto] text-[20px]">
                        GET IN TOUCH
                    </h2>

                    {/* Legal Name */}
                    <div>
                        <p className="text-xs text-gray-500 mb-1">
                            LEGAL / OWNER NAME
                        </p>

                        <p className="text-[15px] font-medium">
                            MUDUMALA SREESHANTH
                        </p>
                    </div>


                    {/* Email */}
                    <div>
                        <p className="text-xs text-gray-500 mb-1">
                            EMAIL
                        </p>

                        <a
                            href="mailto:sreeshanth252525@gmail.com"
                            className="text-[15px] hover:text-[#FF69B4] transition break-all"
                        >
                            sreeshanth252525@gmail.com
                        </a>
                    </div>


                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/_twistnbloom.co/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-[#FF69B4] transition"
                    >
                        <img
                            className="w-[16px] h-[16px]"
                            src={assets.instagram_icon}
                            alt="Instagram"
                        />

                        <p className="font-[Cardo] sm:text-[17px]">
                            @_twistnbloom.co
                        </p>
                    </a>

                </div>

            </div>


            {/* Bottom Footer */}
            <div>

                <hr className="border-gray-300" />

                <div className="px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-600">

                    <p className="text-center">
                        © 2026 TwistNBloom. All Rights Reserved.
                    </p>

                    <p className="text-center">
                        Legal Name: <span className="font-medium text-gray-800">
                            MUDUMALA SREESHANTH
                        </span>
                    </p>

                </div>

            </div>

        </footer>
    )
}

export default Footer