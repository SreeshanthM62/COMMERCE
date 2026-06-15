import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from "react-router-dom"

const ProductItem = ({ id, image, name, price }) => {

  const { currency, addToCart } = useContext(ShopContext)
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
        <p className='pb-1.5 text-[18px] font-semibold font-[BioRhyme] sm:text-[18px]'>{currency}{price}</p>
        <button onClick={() => addToCart(id)} className="py-1.25 font-[Alegreya] font-semibold bg-[#FF69B4] text-white border-0 cursor-pointer sm:text-[18px] rounded-xl">Add To Cart ❀</button>
      </div>

    </div>


  )
}

export default ProductItem
