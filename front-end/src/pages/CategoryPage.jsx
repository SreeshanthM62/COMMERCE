import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem'

const CategoryPage = () => {

    const { backendURL } = useContext(ShopContext)
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const response = await axios.get(backendURL + `/api/product/category/${categoryName}`)
            if (response.data.success) {
                setProducts(response.data.products);
            }
        };

        fetchProducts();

    }, [categoryName]);
    return (
        <div className='m-2'>

           <h1 className='font-[Alegreya] font-extrabold text-[23px] sm:text-[35px] italic flex flex-col items-center text-center'>{
            categoryName==="Bouquet"?"BOUQUETS"
           :categoryName==="flower-pots"?"FLOWER POTS"
           :categoryName==="keychain"?"KEYCHAINS"
           :"FLOWERS"}
          <p className="w-[75%] h-[1.5px] bg-black"></p>
        </h1>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6 p-4'>

                {
                    products.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }

            </div>

        </div>
    )
}

export default CategoryPage
