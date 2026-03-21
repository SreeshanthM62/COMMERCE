import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (

    <section className=" w-full">
      <div
        className="
          h-full
          flex sm:grid
          sm:grid-cols-3
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory
          scroll-smooth
        "
      >
        {/* IMAGE 1 */}
        <div className="relative h-[65vh] sm:h-[70vh] w-full flex-shrink-0 snap-center">
          <img
            src={assets.bouquet_hero}
            className="h-[65vh] sm:h-[70vh]  w-full object-cover"
            alt="Flowers"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              BOUQUETS
            </h1>
            <p className="text-sm lg:text-base opacity-90">
              Brighten Someone's Day With These Handmade Bouquets
            </p>
          </div>
        </div>

        {/* IMAGE 2 */}
        <div className="relative h-[65vh] sm:h-[70vh] w-full flex-shrink-0 snap-center">
          <img
            src={assets.pot_hero}
            className="h-[65vh] sm:h-[70vh] w-full object-cover"
            alt="Pot"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1  className="text-3xl lg:text-4xl font-bold mb-2">
              MINI FLOWER POTS
            </h1>
            <p className="text-sm lg:text-base opacity-90">
              Add Elegence To Your Space With These Flower Pots
            </p>
          </div>
        </div>

        {/* IMAGE 3 */}
        <div className="relative h-[65vh] sm:h-[70vh] w-full flex-shrink-0 snap-center">
          <img
            src={assets.keychain_hero}
            className="h-[65vh] sm:h-[70vh] w-full object-cover"
            alt="keychain"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              KEYCHAINS
            </h1>
            <p className="text-sm lg:text-base opacity-90">
              KeyChains
            </p>
          </div>
        </div>

      </div>
    </section>

  )
}

export default Hero
