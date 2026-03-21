import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from "axios"
import { toast } from 'react-toastify'

const Orders = () => {

  const { backendURL, navigate, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {

      console.log("My token", token)
      if (!token) {
        return null
      }

      const response = await axios.post(backendURL + "/api/order/userorders", {}, { headers: { Authorization: `Bearer ${token}` } })
      console.log(response.data)
      if (response.data.success) {
        // let allOrdersItem = []
        // response.data.orders.map((order) => {
        //   order.items.map((item) => {
        //     item["orderUpdate"] = order.orderUpdate
        //     item["status"] = order.status
        //     item["payment"] = order.payment
        //     item["paymentMethod"] = order.paymentMethod
        //     item["date"] = order.date
        //     item["orderId"] = order.orderId
        //     allOrdersItem.push(item)
        //   })
        // })
        // console.log("ITEMS", allOrdersItem)
        // setOrderData(allOrdersItem.reverse())

        setOrderData(response.data.orders.reverse())

      }
    } catch (error) {
      console.error("Failed to load orders:", error)

    }
  }

  const handleRetry = async (orderId) => {
    try {
                const response = await axios.post(backendURL + "/api/order/retrycashfreepayment", {orderId}, { headers: { Authorization: `Bearer ${token}` } })
    
                const data = response.data;
    
                if (response.data.success) {
                  console.log("Full Data from Backend:", response.data);
                  console.log(response.data)
                  navigate(
                    `/payment?orderId=${data.orderId}&session=${data.paymentSessionId}`
                  );
    
                } else {
                  toast.error(response.data.message)
                }
    
              } catch (error) {
                console.log(error)
                toast.error(error.response?.statusText || "Something went wrong");
    
    
              }
    
};

  useEffect(() => {
    loadOrderData()
  }, [token])



  return (
    <div className="border-t pt-12 max-w-7xl mx-auto px-4">

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orderData.map((order, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
        >

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-11 border-b pb-4 mb-4">

            <div className='md:p-3 sm:border-r'>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{order.orderId}</p>

              <p className="text-sm text-gray-500 mt-2">Order Date</p>
              <p>{new Date(order.date).toDateString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Payment Status</p>
              <p
                className={`font-semibold ${order.status === "PAID"
                  ? "text-green-600"
                  : order.status === "FAILED"
                    ? "text-red-600"
                    : "text-yellow-600"
                  }`}
              >
                {order.status}
              </p>
            </div>

            <div className='md:p-3 sm:border-r'>
              <p className="text-sm text-gray-500">Order Status</p>
              <p
                className={`font-semibold ${order.orderUpdate === "CANCELLED" ? "text-red-600" : ""}`}
              >
                {order.orderUpdate}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Order Note</p>
              <p

              >
                {order.note}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-bold text-lg">
                {currency}
                {order.amount}
              </p>
            </div>

            <div className='text-sm text-gray-500'>
              Delivery Information
              <div className="flex gap-3 justify-center">
                <div>
                
                  <p className='font-medium text-black'>{order.address.firstName} {order.address.lastName}</p>
                  <p className="font-medium text-black">{order.address.phone}</p>
                </div>

                
                <div>
                 
                  <p className="font-medium text-black">{order.address.street}</p>
                  <p className="font-medium text-black">
                    {order.address.city}, {order.address.state}
                  </p>
                  <p className="font-medium text-black">
                    {order.address.country} - {order.address.zipcode}
                  </p>
                </div>

              </div>


            </div>



          </div>

          {/* ITEMS */}
          <div className="space-y-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <img
                  src={item.image?.[0]}
                  alt={item.name}
                  className="w-24 h-28 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-600">
                    {currency}
                    {item.price}
                  </p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>


          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">

            {/* Retry Button */}
            {order.paymentMethod === "CashFreePayment" &&
              (order.status === "PENDING" ||
                order.status === "FAILED") && (
                <button
                  onClick={() => handleRetry(order.orderId)}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition cursor-pointer"
                >
                  Retry Payment
                </button>
              )}

            {(order.status === "CANCELLED" && order.orderUpdate === "CANCELLED")
              ? <button
                disabled
                className="border px-6 py-2 rounded-lg bg-red-500 transition cursor-not-allowed"

              >
                Track Order
              </button>
              :
              <button
                onClick={loadOrderData}
                className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                Track Order
              </button>
            }
          </div>

        </div>
      ))}
    </div>
  );
}

export default Orders
