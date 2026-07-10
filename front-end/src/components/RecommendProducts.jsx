import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import { ShopContext } from '../context/ShopContext';

const RecommendProducts = ({ currentProductId }) => {
    const [items, setItems] = useState([]);
    const { backendURL } = useContext(ShopContext);

    useEffect(() => {
        const fetchRecs = async () => {
            try {
                const res = await axios.get(backendURL + `/api/recommendations/get-recommendation/${currentProductId}`);
                setItems(res.data.recommendedProducts);
                console.log("dATA", res.data)
            } catch (err) {
                console.error("Error getting recommendations", err);
            }
        };
        if (currentProductId) fetchRecs();
    }, [currentProductId]);

    if (items.length === 0) return [];

    return (
        <div className="recommendations-section">
            <div className='flex flex-col justify-center items-center mb-4'>
                <h1 className='font-[Jost] font-bold italic text-[20px] sm:text-[30px] flex flex-col items-center text-center'>People Who Viewed This Also Liked
                    <p className="w-[75%] h-[1.5px] bg-black"></p>
                </h1>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {items.map(product => (
                    <ProductItem key={product._id} id={product._id} image={product.image} name={product.name} price={product.price} />
                ))}
            </div>
        </div>
    );
};

export default RecommendProducts;