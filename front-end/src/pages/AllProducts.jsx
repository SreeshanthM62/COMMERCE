import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'





const AllProducts = () => {

  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])



  useEffect(() => {
    setFilterProducts(products)
  }, [])

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])



  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }

    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const togglesubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }

    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let ProductsCopy = products.slice();

    if (showSearch && search) {
      ProductsCopy = ProductsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      ProductsCopy = ProductsCopy.filter(item => (category.includes(item.category)))
    }

    if (subCategory.length > 0) {
      ProductsCopy = ProductsCopy.filter(item =>
        item.subCategory.some(sub =>
          subCategory.includes(sub)
        )
      );
    }

    setFilterProducts(ProductsCopy)
  }





  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Left Section */}
      <div>
        <div className='min-w-60 p-5'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
            FILTERS
            <img className={`w-[12px] h-3 sm:hidden ${showFilter ? "rotate-270" : ""}`} src={assets.dropdown_icon} />
          </p>


          <div className="flex gap-2 sm:flex-col">
            {/* Category FIlter */}
            <div className={`border w-full border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? "" : "hidden"}`}>
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>

              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Bouquet" onChange={toggleCategory} />Bouquet</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="flower-pots" onChange={toggleCategory} />FlowerPots</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="keychain" onChange={toggleCategory} />KeyChain</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="flower" onChange={toggleCategory} />Flower</p>
              </div>
            </div>

            {/* SubCategory Filter */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 w-full sm:block ${showFilter ? "" : "hidden"}`}>
              <p className="mb-3 text-sm font-medium">FLOWER TYPE</p>

              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Lily" onChange={togglesubCategory} />Lily</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Sunflower" onChange={togglesubCategory} />Sunflower</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Tulip" onChange={togglesubCategory} />Tulip</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Gerbera" onChange={togglesubCategory} />Gerbera</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Rose" onChange={togglesubCategory} />Rose</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Daisy" onChange={togglesubCategory} />Daisy</p>

                <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value="Hydrangea" onChange={togglesubCategory} />Hydrangea</p>
              </div>
            </div>

          </div>

          {/* Color Filter */}

          <div className={`border border-gray-300 pl-5 pr-5 py-4 mt-6 rounded sm:block ${showFilter ? "" : "hidden"}`}>
            <p className="mb-3 text-sm font-medium text-center">COLORS</p>


            <div className="flex flex-wrap gap-3">
              {/* Blue */}
              <button className="w-6 h-6 rounded-full bg-blue-500 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>

              {/* Pink */}
              <button className="w-6 h-6 rounded-full bg-pink-400 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>

              {/* Yellow */}
              <button className="w-6 h-6 rounded-full bg-yellow-400 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>

              {/* Violet */}
              <button className="w-6 h-6 rounded-full bg-violet-500 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>

              {/* Red */}
              <button className="w-6 h-6 rounded-full bg-red-500 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>

              {/* White */}
              <button className="w-6 h-6 rounded-full bg-white border 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>

              {/* Green */}
              <button className="w-6 h-6 rounded-full bg-green-500 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>

              {/* Orange */}
              <button className="w-6 h-6 rounded-full bg-orange-500 
      ring-2 ring-transparent hover:ring-gray-400 
      active:scale-90 transition cursor-pointer active:ring-2 active:ring-black"></button>
            </div>


          </div>
        </div>
      </div>


      {/* Right Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base items-center sm:text-2xl mb-4">
          <h1 className='m-4 font-[Neuton] font-bold text-2xl sm:text-3xl'>ALL PRODUCTS</h1>

          {/* Product Sort */}
          <select className="border-2 border-gray-300 mr-3 text-[13px] h-[33px] p-[5px]">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6 p-4'>

          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }

        </div>
      </div>

    </div>
  )
}

export default AllProducts
