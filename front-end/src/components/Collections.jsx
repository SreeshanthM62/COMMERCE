import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import FlowerLoader from './Loading'


const Collections = () => {

  const { products,navigate, isLoading } = useContext(ShopContext)
  const [BestSeller, setBestSeller] = useState([])
 


  useEffect(() => {
    const bestProduct = products.filter((item) => (item.bestSeller));
    setBestSeller(bestProduct.slice(0, 10))

  }, [products])
  return (
    <div className='p-5 flex flex-col items-center gap-5'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-[Arizonia] font-extrabold text-[23px] sm:text-[35px] flex flex-col items-center text-center'>PRODUCTS
          <p className="w-[75%] h-[1.5px] bg-black"></p>
        </h1>

      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        { isLoading? (<FlowerLoader/>) :
          (BestSeller.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          )))
        }

      </div>

      <button onClick={()=>navigate("/all-products")} className="px-6 py-2 text-sm font-medium text-[#FF69B4] border border-[#FF69B4] 
rounded-full hover:bg-[#FF69B4] hover:text-white active:bg-[#FF69B4] active:text-white transition duration-300 cursor-pointer">
        View All →
      </button>
    </div>
  )
}

export default Collections
