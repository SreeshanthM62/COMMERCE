import React, { useContext, useState, useEffect } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const PlaceOrder = () => {

  const [method, setMethod] = useState("COD")
  const { navigate, backendURL, token, cartItems, setCartItems, getCartAmount, delivery_fee, currency, products } = useContext(ShopContext)
  const [items, setItems] = useState([])



  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    orderNote: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {

      let orderItems = []

      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === items))
          if (itemInfo) {
            itemInfo.quantity = cartItems[items]
            orderItems.push(itemInfo)
          }

        }

      }

      // console.log(orderItems)

      let orderData = {
        address: formData,
        note: formData.orderNote,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }









      switch (method) {

        case "COD": {
          const response = await axios.post(backendURL + "/api/order/place", orderData, { headers: { Authorization: `Bearer ${token}` } })

          if (response.data.success) {
            console.log(response.data)
            setCartItems({})
            navigate("/orders")
          }
          else {
            toast.error(response.data.message)
          }

          break;
        }

        case "cashfreepayment": {

          try {
            const response = await axios.post(backendURL + "/api/order/cashfreepayment", orderData, { headers: { Authorization: `Bearer ${token}` } })

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
            if (error.response.data.message == "No token") {
              toast.error("Please Login/SignUp First")
            }
            else {
              toast.error(error.response.statusText || "Something went wrong");
            }


          }



        }
          break;

        case "stripe":
          toast.info("Stripe integration coming soon")
          break;

        default:
          toast.error("Invalid payment method")



      }

    } catch (error) {
      console.log(error.response.statusText)
      toast.error(error.response.statusText)

    }

  }

  const getItems = async () => {
    try {

      let userItems = []

      for (const items in cartItems) {
        if (cartItems[items] > 0) {
          const itemInfo = structuredClone(products.find(product => product._id === items))
          if (itemInfo) {
            itemInfo.quantity = cartItems[items]
            userItems.push(itemInfo)
          }

        }

      }

      console.log(userItems)

      setItems(userItems)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getItems();
    }
  }, [cartItems, products]);




  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row sm:justify-evenly'>
      <section className="max-w-3xl px-5 py-10">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-wide text-gray-800">
            DELIVERY INFORMATION
          </h2>
          <div className="mt-2 h-[2px] w-16 bg-gray-800"></div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* First Name */}
          <input
            onChange={onChangeHandler} name="firstName" value={formData.firstName}
            type="text"
            placeholder="First name"
            className="input-field"
            required
          />

          {/* Last Name */}
          <input
            onChange={onChangeHandler} name="lastName" value={formData.lastName}
            type="text"
            placeholder="Last name"
            className="input-field"
            required
          />

          {/* Email */}
          <input
            onChange={onChangeHandler} name="email" value={formData.email}
            type="email"
            placeholder="Email address"
            className="input-field md:col-span-2"
            required
          />

          <input
            onChange={onChangeHandler} name="phone" value={formData.phone}
            type="tel"
            placeholder="Phone"
            className="input-field md:col-span-2"
            required
          />

          {/* Street */}
          <input
            onChange={onChangeHandler} name="street" value={formData.street}
            type="text"
            placeholder="H.No:  ,Street"
            className="input-field md:col-span-2"
            required
          />

          {/* City */}
          <input
            onChange={onChangeHandler} name="city" value={formData.city}
            type="text"
            placeholder="City"
            className="input-field"
            required
          />

          {/* State */}
          <input
            onChange={onChangeHandler} name="state" value={formData.state}
            type="text"
            placeholder="State"
            className="input-field"
            required
          />

          {/* Zipcode */}
          <input
            onChange={onChangeHandler} name="zipcode" value={formData.zipcode}
            type="text"
            placeholder="Pincode"
            className="input-field"
            required
          />

          {/* Country */}
          <input
            onChange={onChangeHandler} name="country" value={formData.country}
            type="text"
            placeholder="Country"
            className="input-field"
            required
          />

          {/* Phone */}


        </div>
      </section>

      <div className="max-w-xl mx-auto px-4 py-10">

        <label className="block text-[23px] font-medium font-[Neuton] text-gray-700 mb-2">
          Order Note (Optional)
        </label>

        <textarea
          name="orderNote"
          value={formData.orderNote}
          onChange={onChangeHandler}
          placeholder="Write your note here..."
          rows={4}
          className="
      w-75
      h-45
      border border-gray-300
      rounded-md
      mt-4
      px-4 py-3
      text-sm
      resize-none
      focus:outline-none
      focus:border-pink-500
      focus:ring-1
      focus:ring-pink-500
    "
        ></textarea>

      </div>

      {/* Right Side */}
      <div className='flex-col py-1 m-2 sm:w-[550px]'>
        <h1 className='font-[BioRhyme] text-[22px] pt-8 pb-3 px-2'>YOUR ITEMS</h1>
        <div className='grid grid-cols-4 sm:grid-cols-5'>

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-8 shadow-md"
            >
              <div className='flex flex-col gap-2'>
                <img
                  src={item.image}
                  className='w-16 h-23 rounded sm:w-18 sm:h-28' />
                <p className='text-wrap text-[13px]'>{item.name}</p>
                <p className='text-[13px]'>{currency}{item.price}</p>
                <p className='text-[12px]'>x{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='py-1'>
          <CartTotal />
          <div className="max-w-xl flex flex-col justify-center items-center px-4 py-6">

            {/* Heading */}
            <h2 className="text-lg font-semibold mb-4">
              PAYMENT METHOD
            </h2>

            {/* Razorpay option */}
            <div className='flex gap-3 flex-col lg:flex-row'>

              {/* <div onClick={() => setMethod("COD")} className="flex items-center gap-3 border px-4 py-3 w-[145px] cursor-pointer mb-6">
                <span className="min-w-4 h-4 border rounded-full flex items-center justify-center">
                  <span className={`min-w-2.5 h-2.5 ${method === "COD" ? "bg-green-500" : ""} rounded-full`}></span>
                </span>


                <img
                  src={assets.cod_logo}
                  alt="Razorpay"
                  className="h-5 w-[125px] object-cover"
                />
              </div> */}

              <div onClick={() => setMethod("cashfreepayment")} className="flex items-center gap-3 border px-4 py-3 w-[145px] cursor-pointer mb-6">
                <span className="min-w-4 h-4 border rounded-full flex items-center justify-center">
                  <span className={`min-w-2.5 h-2.5 ${method === "cashfreepayment" ? "bg-green-500" : ""} rounded-full`}></span>
                </span>


                <img
                  src={assets.cashfree_logo}
                  alt="Razorpay"
                  className="h-6 w-[95px] object-cover"
                />
              </div>

              <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border px-4 py-3 w-[145px] cursor-pointer mb-6">
                <span className="min-w-4 h-4 border rounded-full flex items-center justify-center">
                  <span className={`min-w-2.5 h-2.5 ${method === "stripe" ? "bg-green-500" : ""} rounded-full`}></span>
                </span>


                <img
                  src={assets.stripe_logo}
                  alt="Stripe"
                  className="h-6 w-[100px] object-cover"
                />
              </div>
            </div>

            {/* Place order */}

            {/* <button type="submit" className="bg-black text-white cursor-pointer px-10 py-3 text-sm">
              PLACE ORDER
            </button> */}

          </div>

        </div>
      </div>


    </form >
  )
}

export default PlaceOrder
