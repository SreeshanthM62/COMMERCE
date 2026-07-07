import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { backendURL, currency } from '../App'
import { toast } from 'react-toastify'
import { Pencil, Trash2 } from "lucide-react";


const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async()=>{
    try {
      
      const response = await axios.get(backendURL+"/api/product/list")
      if(response.data.success){
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  const removeProduct = async(id)=>{
    try {
      const response = await axios.post(backendURL+"/api/product/remove",{id},{headers: {Authorization: `Bearer ${token}`}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  
  return (
    <>

    <p className="mb-4 text-lg font-semibold">All Products</p>

<div className="flex flex-col gap-4 w-full max-w-5xl">

  {list.map((item) => (
    <div
      key={item._id}
      className="flex items-center justify-between border rounded-xl p-4 shadow-sm bg-white"
    >
      {/* Left Side */}
      <div className="flex items-center gap-5">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg border"
        />

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{item.name}</h2>

          <p className="text-gray-500">
            Category :
            <span className="font-medium text-gray-700">
              {" "}
              {item.category}
            </span>
          </p>

          <p className="text-pink-600 font-semibold">
            {currency}
            {item.price}
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-blue-100 transition">
          <Pencil size={20} className="text-blue-600" />
        </button>

        <button
          onClick={() => removeProduct(item._id)}
          className="p-2 rounded-lg hover:bg-red-100 transition"
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
