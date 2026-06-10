import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from "react-router-dom"

const ProductItem = ({ id, image, name, price }) => {

    const opt_image = image[0]?.replace("/upload/", "/upload/f_auto,q_auto,w_500/")

    const { currency,addToCart} = useContext(ShopContext)
    return (
    <div className='flex flex-col justify-between'>
      <Link className="cursor-pointer" to={`/product/${id}`}>
        <div className='overflow-hidden'>
            <img className='rounded hover:scale-110 transition ease-in-out w-[250px] h-[250px] sm:h-[450px] sm:w-[400px]' src = {opt_image}/>
        </div>
        <h1 className='pt-3 pb-1 text-sm font-bold font-[BioRhyme] sm:text-[16px]'>{name}</h1>
        <p className='text-sm font-semibold sm:text-[15px]'>{currency}{price}</p>
      </Link>

        <button onClick={()=>addToCart(id)} className="px-[2px] py-[2px] font-semibold bg-[#FF69B4] border-0 font-[Neuton] cursor-pointer sm:text-[18px]">Add To Cart ❀</button>

    </div>


    )
}

export default ProductItem
