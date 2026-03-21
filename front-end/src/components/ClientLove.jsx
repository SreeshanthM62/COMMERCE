import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

const ClientLove = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    const images = Object.values(
        import.meta.glob('../assets/ClientLove/*.{jpg,jpeg,png}', { eager: true })
    ).map((img) => img.default);

    console.log(images.length);

    return (
        <div className="container">

            <h1 className='font-[Fraunces] font-extrabold italic text-[22px] sm:text-[37px] text-pink-400 flex flex-col items-center text-center mb-5.5'>CLIENT LOVE
                <p className=" h-[2.5px] w-[30%] sm:w-[12%] bg-pink-400"></p>
            </h1>
            
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                spaceBetween={20}
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                    },
                    640: {
                        slidesPerView: 1.25,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 1.8,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper_container"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`slide-${index}`}
                            onClick={() => setSelectedImage(img)}
                            style={{ cursor: "pointer" }} />
                    </SwiperSlide>
                ))}

                {selectedImage && (
                    <div className="image-modal" onClick={() => setSelectedImage(null)}>
                        <img src={selectedImage} onClick={(e) => e.stopPropagation()} alt="Full view" />
                    </div>
                )}


            </Swiper>
        </div>
    );
}






export default ClientLove
