import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

    const [Visible, setVisible] = useState(false)
    const [Open, setOpen] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

    const logout = () => {
        navigate("/login")
        localStorage.removeItem("token")
        setToken("")
        setCartItems({})

    }

    return (

        <>

            <header className='flex sticky top-0 z-50 justify-between sm:grid sm:grid-cols-3 items-center w-full px-4 backdrop-blur-md bg-white/70'>

                <div className='justify-self-start'>
                    <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-[18px] sm:w-[20px] cursor-pointer ' />
                </div>

                <div className="justify-self-center title">
                    <Link to="/">
                        <h1 className='text-[32px] w-auto sm:text-5xl sm:py-1 whitespace-nowrap'>TwistNBloom</h1>
                    </Link>
                </div>

                <nav className="justify-self-end flex min-w-0">

                    <ul className="flex items-center gap-5 list-none">
                        <li>
                        <Link to="/all-products">
                            <img onClick={() => setShowSearch(true)} className="w-[18px] sm:w-[20px] shrink-0 cursor-pointer" src={assets.search_icon} />
                        </Link>
                        </li>


                        <div className='group relative'>
                            <li><img onClick={() => {
                                setOpen(!Open)
                                token ? "null" : navigate("/login")
                            }} className="w-[18px] sm:w-[20px] shrink-0 cursor-pointer" src={assets.login_icon} /></li>
                            {/* Dop dOWN */}
                            {token &&
                                <div className={`${Open ? 'block' : 'hidden'} sm:hidden z-[9999] sm:group-hover:block absolute dropdown-menu right-0 pt-4 `}>
                                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                        <button onClick={() => navigate("/profile")} className='active:text-pink-700  cursor-pointer sm:hover:text-pink-700'>Profile</button>
                                        <button onClick={() => navigate("/orders")} className='active:text-pink-700  cursor-pointer sm:hover:text-pink-700'>Orders</button>
                                        <button onClick={logout} className='active:text-pink-700  cursor-pointer sm:hover:text-pink-700'>Logout</button>
                                    </div>
                                </div>}
                        </div>
                        
                        <li>
                        <Link to="/wishlist" className='relative'>
                            <li>
                                <img className="w-[18px] sm:w-[20px] shrink-0 cursor-pointer" src={assets.wishlist_icon} />
                            </li>

                        </Link>
                        </li>

                        <li>
                        <Link to="/cart" className='relative'>
                            <li>
                                <img className="w-[18px] sm:w-[20px] shrink-0 cursor-pointer" src={assets.cart_icon} />
                                <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[9px]'>{getCartCount()}</p>
                            </li>

                        </Link>
                        </li>

                        
                        



                    </ul>

                </nav>


            </header>

            {/* SideBar */}
            <div className={`fixed top-0 left-0 bottom-0 overflow-hidden z-[9999] bg-white border border-t-0 border-b-0 transition-all ${Visible ? 'w-[70vw] sm:w-[38vw]' : 'w-0'}`}>
                <div className='flex flex-col '>
                    <div onClick={() => setVisible(false)} className='flex items-center p-1 m-2 mt-3 w-[25px] gap-3 cursor-pointer'>
                        <img className="w-[22px] cursor-pointer" src={assets.back_icon} />
                    </div>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[#FF69B4] hover:bg-[#FF69B4] hover:text-white active:bg-[#FF69B4] active:text-white border border-b-0 flex justify-between items-center border-gray-300 border-r-0 font-[Neuton] text-[17px] font-extrabold" to="/">HOME <img className='w-[18px] h-[18px] mr-[10px]' src={assets.flower} /></NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[#FF69B4] hover:bg-[#FF69B4] hover:text-white active:bg-[#FF69B4] active:text-white border border-b-0 flex justify-between items-center border-gray-300 border-r-0 font-[Neuton] text-[17px] font-extrabold" to="/all-products">ALL PRODUCTS <img className='w-[18px] h-[18px] mr-[10px]' src={assets.flower} /></NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[#FF69B4] hover:bg-[#FF69B4] hover:text-white active:bg-[#FF69B4] active:text-white border border-b-0 flex justify-between items-center border-gray-300 border-r-0 font-[Neuton] text-[17px] font-extrabold" to="/about">ABOUT <img className='w-[18px] h-[18px] mr-[10px]' src={assets.flower} /></NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[#FF69B4] hover:bg-[#FF69B4] hover:text-white active:bg-[#FF69B4] active:text-white border flex justify-between items-center border-gray-300 border-r-0 font-[Neuton] text-[17px] font-extrabold" to="/contact">CONTACT US <img className='w-[18px] h-[18px] mr-[10px]' src={assets.flower} /></NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[#FF69B4] hover:bg-[#FF69B4] hover:text-white active:bg-[#FF69B4] active:text-white border flex justify-between items-center border-gray-300 border-r-0 font-[Neuton] text-[17px] font-extrabold" to="/terms-and-conditions">TERMS AND CONDITIONS <img className='w-[18px] h-[18px] mr-[10px]' src={assets.flower} /></NavLink>
                    <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[#FF69B4] hover:bg-[#FF69B4] hover:text-white active:bg-[#FF69B4] active:text-white border flex justify-between items-center border-gray-300 border-r-0 font-[Neuton] text-[17px] font-extrabold" to="/refund-policy">REFUND AND CANCELLATION POLICY<img className='w-[18px] h-[18px] mr-[10px]' src={assets.flower} /></NavLink>
                </div>

            </div>

        </>

    )
}

export default Navbar
