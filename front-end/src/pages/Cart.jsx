import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {


    if (products.length > 0) {
      const tempData = [];

      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          tempData.push({
            _id: items,
            quantity: cartItems[items]
          });
        }

      }
      setCartData(tempData)

    }


  }, [cartItems,products]);

  return (


    <div className='border-t pt-8'>
      <div className=' mb-3'>
        <h1 className='p-5 text-[35px]  font-[Neuton]'>YOUR CART
        </h1>


      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id)

            if (!productData) return null



            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start sm:ml-14 ml-8 gap-6'>
                  <img className="w-16 h-23 rounded sm:w-20 sm:h-28" src={productData.image[0]} />
                  <div>
                    <p className='text-[16px] font-[Neuton] font-bold sm:text-[21px] '>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='text-[18px] text-pink-500 font-bold'>{currency}{productData.price}</p>

                    </div>
                  </div>

                </div>

                <input onChange={(e) => {
                  const value = Number(e.target.value)
                  if (value > 0) {
                    updateQuantity(item._id, value)
                  }
                }}
                  className="max-w-10 border border-gray-600 rounded sm:max-w-15 px-1 sm:px-2 py-1" type="number" min={1} max={6} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, 0)} className='w-4 sm:w-5  mr-4 cursor-pointer' src={assets.bin_icon} />
              </div>
            )
          })


        }
      </div>

      <div className='flex justify-end my-20'>
        <div className=' flex flex-col items-center justify-end'>
          <CartTotal />
          <div className='text-end '>
            <button onClick={() => navigate("/place-order")} className='bg-black text-white cursor-pointer px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
