import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets'
import ProductItem from '../components/ProductItem';
import axios from "axios"

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, backendURL } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState("")
  const [categoryProducts, setCategoryProducts] = useState([]);

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  console.log("Product Data: ", productData)

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  const categoryName = productData.category

  useEffect(() => {

    const fetchProducts = async () => {
      const response = await axios.get(backendURL + `/api/product/category/${categoryName}`)
      if (response.data.success) {
        setCategoryProducts(response.data.products);
      }
    };

    fetchProducts();

  }, [categoryName]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col lg:flex-row gap-13 mt-6 max-w-6xl px-4">

        {/* LEFT: Images */}
        <div className="flex flex-col-reverse lg:flex-row lg:ml-10 gap-4 w-full lg:w-1/2">

          {/* Thumbnail Images */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto 
                      max-h-[500px] lg:w-28">
            {productData.image.map((item, index) => (
              <div className='w-26 h-35 flex justify-center items-center '>
                <img
                  key={index}
                  src={item}
                  onClick={() => setImage(item)}
                  className="w-[93%] h-[93%] sm:h-[90%] object-cover  cursor-pointer border 
                       hover:border-black transition rounded-2xl"
                  alt=""
                />
              </div>

            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={image}
              className="aspect-4/5 hover:scale-105 object-cover"
              alt=""
            />
          </div>
        </div>


        {/* RIGHT: Product Info */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h1 className="text-3xl font-[Eczar] font-semibold">{productData.name}</h1>


          <p className="text-[30px] font-[BioRhyme] font-bold text-pink-500">
            {currency}{productData.price}
          </p>

          <p className="text-[14px] sm:text-[16px] font-[Eczar] ">{productData.description}</p>



          <button onClick={() => addToCart(productData._id)} className=" bg-[#FF69B4] border-0 font-[Alegreya] font-semibold text-[white] cursor-pointer rounded-full py-2 px-5 sm:text-[20px]">Add To Cart ❀</button>

          <div className='flex flex-col justify-center gap-1 mt-4 pt-8 border-t-1 sm:border-t-2'>
            <div className='flex flex-row gap-3 items-center'>
              <img className='w-8  mb-4' src={assets.flower_icon} />
              <p className='font-bold font-[Alegreya] text-gray-500 text-[12px] sm:text-[15px] text-center mb-2.5'>AFFORDABLE AND CUSTOMIZABLE</p>
              <p></p>
            </div>

            <div className='flex flex-row mr-2 gap-3 items-center'>
              <img className="w-7  mb-4" src={assets.heart_icon} />
              <p className='font-bold font-[Alegreya] text-gray-500 text-center sm:text-[15px] text-[12px] mb-2.5'>HANDMADE WITH LOVE AND CARE</p>
              <p></p>
            </div>

            <div className='flex flex-row gap-3 items-center'>
              <img className='w-8 mb-4' src={assets.truck_icon} />
              <p className='font-bold font-[Alegreya] text-gray-500 text-center sm:text-[15px] text-[12px] mb-2.5'>SHIPPING ALL OVER INDIA</p>
              <p></p>
            </div>



          </div>

        </div>



      </div>

      <div className='flex flex-col justify-center items-center mt-7'>
        <h1 className='font-[Arizonia] font-extrabold text-[23px] sm:text-[35px] flex flex-col items-center text-center'>RELATED PRODUCTS
          <p className="w-[75%] h-[1.5px] bg-black"></p>
        </h1>

      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 p-4'>

                {
                    categoryProducts.slice(0,5).map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }

            </div>


    </div>
  ) : <div className='opacity-0'>



  </div>

}

export default Product
