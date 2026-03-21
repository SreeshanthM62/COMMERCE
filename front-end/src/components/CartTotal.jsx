import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
  return (
    <div className='m-10 w-[80vw] sm:w-[450px]'>
        <div className='text-2xl'>
            <h1 className='font-[BioRhyme]'>CART TOTALS
                <p className="w-[100%] h-[1.5px] bg-black"></p>
            </h1>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex items-center justify-between'>
                <p>SubTotal</p>
                <p className='text-[16px]'>{currency}{getCartAmount()}.00</p>

            </div>
            <hr />
            <div className='flex items-center justify-between'>
                <p>Shipping Fee</p>
                <p className='text-[16px]'>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex items-center justify-between'>
                <b className='text-[17px]'>Total</b>
                <b className='text-[17px]'>{currency} {getCartAmount()===0?0:getCartAmount()+delivery_fee}.00</b>

            </div>

        </div>
      
    </div>
  )
}

export default CartTotal
