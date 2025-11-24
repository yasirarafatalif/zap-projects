import React from 'react';
import 'swiper/css';
import amazon from '../../assets/brands/amazon.png'
import moonstar from '../../assets/brands/moonstar.png'
import star from '../../assets/brands/star.png'
import start_people from '../../assets/brands/start_people.png'
import casio from '../../assets/brands/casio.png'
import amazon_vector from '../../assets/brands/amazon_vector.png'
import randstad from '../../assets/brands/randstad.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const HomeSlider = () => {
    const brans =[amazon,moonstar,star,start_people,casio,amazon_vector,randstad ]
    return (
      <>
      <Swiper
      loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
          autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className='py-6 my-6'
      >
       {
        brans.map((logo, index)=> <SwiperSlide key={index}>
            <img src={logo}   />
        </SwiperSlide>)

       }
      </Swiper>
    </>
    );
};

export default HomeSlider;