import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const ShopByCategory = () => {
    return (

        <div className='flex flex-col gap-3'>


            <div className='flex flex-col justify-center items-center'>
                <h1 className='font-[Jost] font-extrabold text-[20px] sm:text-[30px] flex flex-col items-center text-center'>SHOP BY CATEGORY
                    <p className="w-[75%] h-[1.5px] bg-black"></p>
                </h1>
            </div>


            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-3 gap-4'>

                <Link to="/category/Bouquet">
                    <div className='flex flex-col gap-3 items-center'>
                        <div className='w-[130px] h-[130px] sm:w-[250px] sm:h-[250px] rounded-full border border-pink-600  overflow-hidden'>
                            <img className="w-full h-full object-cover" src={assets.bouquet_cat1} />
                        </div >
                        <h1 className='font-[Alegreya] font-bold text-[20px]'>BOUQUETS</h1>
                    </div>
                </Link>

                <Link to="/category/flower-pots">
                    <div className='flex flex-col gap-3 items-center'>
                        <div className='w-[130px] h-[130px] sm:w-[250px] sm:h-[250px] rounded-full border border-pink-600  overflow-hidden'>
                            <img className="w-full h-full object-cover" src={assets.flowerpot_cat} />
                        </div >
                        <h1 className='font-[Alegreya]  font-bold text-[20px]'>FLOWER POTS</h1>
                    </div>
                </Link>

                <Link to="/category/keychain">
                    <div className='flex flex-col gap-3 items-center'>
                        <div className='w-[130px] h-[130px] sm:w-[250px] sm:h-[250px] rounded-full border border-pink-600  overflow-hidden'>
                            <img className="w-full h-full object-cover" src={assets.keychain_cat} />
                        </div >
                        <h1 className='font-[Alegreya] font-bold text-[20px]'>KEYCHAINS</h1>
                    </div>
                </Link>

                <Link to="/category/flower">
                    <div className='flex flex-col gap-3 items-center'>
                        <div className='w-[130px] h-[130px] sm:w-[250px] sm:h-[250px] rounded-full border border-pink-600  overflow-hidden'>
                            <img className="w-full h-full object-cover" src={assets.sbb25} />
                        </div >
                        <h1 className='font-[Alegreya] font-bold text-[20px]'>FLOWERS</h1>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default ShopByCategory
