import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL, currency } from '../App'
import { toast } from 'react-toastify'
import { Pencil, Trash2 } from "lucide-react";


const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendURL + "/api/product/list")
      if (response.data.success) {
        setList(response.data.products)
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendURL + "/api/product/remove", { id }, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <>


      <p className="mb-4 text-xl font-semibold">All Products</p>

      <div className="flex flex-col gap-4 w-full">

        {list.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-xl p-4 shadow-sm bg-white"
          >

            {/* Product Details */}
            <div className="flex gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border"
              />

              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold">{item.name}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  Category:
                  <span className="font-medium text-gray-700">
                    {" "}
                    {item.category}
                  </span>
                </p>

                <p className="text-pink-600 font-semibold text-lg mt-1">
                  {currency}
                  {item.price}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end sm:justify-center gap-3">

              <button
                className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
              >
                <Pencil size={20} className="text-blue-600" />
              </button>

              <button
                onClick={() => removeProduct(item._id)}
                className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
              >
                <Trash2 size={20} className="text-red-600" />
              </button>

            </div>

          </div>
        ))}

      </div>
    </>
  )
}

export default List
