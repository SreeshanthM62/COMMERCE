import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import paymentFailed from './paymentFailed'

const PaymentSuccess = () => {

    const { backendURL,setCartItems} = useContext(ShopContext)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Inside your PaymentSuccess component
const token = localStorage.getItem('token'); // or whatever key you use

if (!token) {
    console.error("No token found in storage!");
    // Redirect to login or show error
}

    const orderId = searchParams.get('order_id');

    useEffect(() => {
        if (orderId) {
            verifyPayment();
        } else {
            setError('No order ID found');
            setLoading(false);
        }
    }, [orderId]);

    console.log("TOKEN:", token);


    const verifyPayment = async () => {
        try {

            const response = await axios.post(backendURL + "/api/order/verifycashfreepayment", { orderId }, { headers: { Authorization: `Bearer ${token}` } })

            console.log("Order ID:", orderId);
            console.log("Backend URL:", backendURL);
            console.log("Token:", token);

            const { data } = response;


            if (data.success) {
                navigate("/orders");
                setCartItems({});

                
            } else {
                setError(data.message || "Payment verification failed");
                <paymentFailed/>
            }

        } catch {
            setError('Failed to verify payment');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Error</h2>
                        <p className="text-gray-600 mb-6">{error}</p> */}
                        <paymentFailed/>

                        <button
                            onClick={() => window.location.href = '/cart'}
                            className="bg-primary hover:bg-primary-dark text-red font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                        >
                            Back to Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null

};



export default PaymentSuccess
