import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import TermsAndConditions from './pages/TermsAndConditions'
import Refund from './pages/Refund'
import Login from './pages/Login'
import AllProducts from './pages/AllProducts'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import PaymentPage from './pages/PaymentPage'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/paymentFailed'
import CategoryPage from './pages/CategoryPage'
import Footer from "./components/Footer"
import SearchBar from './components/SearchBar'
import ScrollToTop from './context/ScrollToTop'
import { ToastContainer, toast } from 'react-toastify';
import Profile from './pages/Profile'
import Alert from './components/Alert'


const App = () => {
  return (
    <div className=''>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored" />
      <Alert />
      <ScrollToTop />
      <Navbar />
      <SearchBar />
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element = {<Profile/>} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />

      </Routes>
      
      <Footer />
      
    </div>
  )
}

export default App
