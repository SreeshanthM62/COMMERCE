import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { backendURL, currency } from "../App"
import { toast } from "react-toastify"
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])


  const fetchAllOrders = async () => {


    if (!token) {
      return null;
    }

    try {

      console.log("Admin Token: ", token)

      const response = await axios.post(backendURL + "/api/order/list", {}, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }

  const statusHandler = async (event, orderId) => {

    try {
      const response = await axios.post(backendURL + "/api/order/status", { orderId, orderUpdate: event.target.value }, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        await fetchAllOrders();
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);



  return (
  <div className="w-full max-w-full px-4 sm:px-6 py-6 bg-gray-50 min-h-screen">

    <h3 className="text-2xl font-bold mb-8">Orders</h3>

    <div className="space-y-6">
      {orders.map((order, index) => (

        <div
          key={index}
          className="w-full bg-white border rounded-xl shadow-sm p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
        >

          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <h4 className="font-semibold text-gray-800">Items</h4>

            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-3 last:border-none">

                <img
                  src={item.image?.[0] || item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* CUSTOMER */}
          <div>
            <h4 className="font-semibold text-pink-500 mb-2">Customer</h4>
            <p className="font-medium">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p className="text-sm text-gray-600">
              {order.address.phone}
            </p>
          </div>

          {/* ADDRESS */}
          <div>
            <h4 className="font-semibold text-pink-500 mb-2">Address</h4>

            <p className="text-sm">{order.address.street}</p>

            <p className="text-sm">
              {order.address.city}, {order.address.state}
            </p>

            <p className="text-sm">
              {order.address.country} - {order.address.zipcode}
            </p>
          </div>

          {/* ORDER NOTE */}
          <div>
            <h4 className="font-semibold text-pink-500 mb-2">
              Order Note
            </h4>

            {order.note ? (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
                {order.note}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No note
              </p>
            )}
          </div>

          {/* PAYMENT INFO */}
          <div className="space-y-1 flex flex-col text-sm min-w-0 gap-3">
            <p>
              <span className="font-semibold">ORDER ID:</span>
              <br />
              <span className="break-all">{order.orderId}</span>
            </p>

            <p>
              <span className="font-semibold">Method:</span>
              <br />
              {order.paymentMethod}
            </p>

            <div>
              <p className="font-semibold">Payment Status:</p>
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

            <p>
              <span className="font-semibold">Date:</span>
              <br />
              {new Date(order.date).toLocaleDateString()}
            </p>

            <p>
              <span className="font-semibold">Amount:</span>
              <br />
              <span className="text-lg font-bold">
                {currency}{order.amount}
              </span>
            </p>
          </div>

          {/* STATUS CONTROL */}
          <div className="flex flex-col w-[160px] gap-1">

            <div className="mb-4">
              <span className="font-semibold">Status</span>
            </div>

            {order.status === "CANCELLED" ? (
              <div className="text-red-600 font-semibold">
                CANCELLED
              </div>
            ) : (
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.orderUpdate}
                 className="p-2 border rounded font-semibold"
              >
                <option value="ORDER PLACED">ORDER PLACED</option>
                <option value="PACKING">PACKING</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
                <option value="DELIVERED">DELIVERED</option>
              </select>
            )}

          </div>

        </div>

      ))}
    </div>
  </div>
);
}

export default Orders
