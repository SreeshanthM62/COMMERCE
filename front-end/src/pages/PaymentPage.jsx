import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { load } from "@cashfreepayments/cashfree-js"
import PaymentFailed from '../pages/paymentFailed'


const PaymentPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const params = new URLSearchParams(location.search);

  const orderId = params.get("orderId");
  const paymentSessionId = params.get("session");

  useEffect(() => {
    if (!orderId || !paymentSessionId) {
      setError("Missing Payment information");
      setLoading(false)
      return;
    }

    initializePayment();

  }, [orderId, paymentSessionId])

  const initializePayment = async () => {
    try {

      const cashfree = await load({ mode: "sandbox" })

      const checkoutoptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self",
      };


      await cashfree.checkout(checkoutoptions);


    } catch (error) {
      console.error("Payment error : ", error);
      setError("Failed to initialize payment");
      // setError("Payment initialization failed");

    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-primary mx-auto mb-4 rounded-full"></div>
          <p>Initializing payment gateway...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Payment Error
          </h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-primary text-white px-6 py-2 rounded-lg"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }



  return null;
}

export default PaymentPage
