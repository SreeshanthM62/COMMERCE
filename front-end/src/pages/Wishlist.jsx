import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'


const Wishlist = () => {

    const { products, wishlist } = useContext(ShopContext)
    
    


    const wishlistProducts = products.filter(product => wishlist.includes(product._id))

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 gap-y-6 p-4'>

          {
            wishlistProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }

        </div>
    )
}

export default Wishlist
