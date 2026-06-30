import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from "react-router-dom"
import { assets } from '../assets/assets'



const ProductItem = ({ id, image, name, price }) => {

  const { currency, addToCart, token, wishlist, toggleWishlist, getWishlist } = useContext(ShopContext)
  const [liked, setLiked] = useState(false)


  return (
    <div className='flex flex-col justify-between'>
      <Link className="cursor-pointer" to={`/product/${id}`}>
        <div className='overflow-hidden'>
          <div className="overflow-hidden rounded">
            <img
              className='aspect-4/5 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-110'
              src={image}
              loading="lazy"
            />
          </div>
        </div>
        <h1 className='pt-3 pb-1 text-[14.5px] font-bold font-[Libre Franklin] sm:text-[17px]'>{name}</h1>

      </Link>

      <div className='flex flex-col'>
        <p className='pb-1.5 text-[15px] font-semibold font-[BioRhyme] sm:text-[18px]'>{currency}{price}</p>
        <div className='flex justify-between gap-2 items-center'>
          <button onClick={() => addToCart(id)} className="w-[78%] h-[95%] sm:w-full text-center py-1 font-[Alegreya] font-semibold bg-[#FF69B4] text-white border-0 cursor-pointer text-[14px] sm:text-[18px] rounded-xl">Add To Cart ❀</button>
          <button className='w-6 h-6 cursor-pointer'
          onClick={()=>toggleWishlist(token, id)}>
            
            <img
            
            className='w-6 h-6 cursor-pointer'
            src={wishlist.includes(id) ? assets.wishlisted_icon: assets.wishlist_icon}
          />
          </button>
        </div>
      </div>

    </div>


  )
}

export default ProductItem
