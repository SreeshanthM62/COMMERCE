import React from 'react'
import Hero from "../components/Hero"
import Collections from '../components/Collections'
import OurPolicy from '../components/OurPolicy'
import ShopByCategory from '../components/ShopByCategory'
import Customization from '../components/Customization'
import ClientLove from '../components/ClientLove'


const Home = () => {
  return (
    <div>
     <Hero/>
     <Collections/>
     <ShopByCategory/>
     <OurPolicy/>
     <Customization/>
     <ClientLove />
    </div>
  )
}

export default Home

