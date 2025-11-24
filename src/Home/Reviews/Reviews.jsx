import React, { use, useEffect, useState } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewsCard from './ReviewsCard';
import Container from '../../Comeponents/Shared/Container';

const Reviews = () => {
    const [reviewsData, setreviewsData] = useState([])
    // console.log(reviewsData);
    useEffect(()=>{
        fetch('/reviews.json')
        .then( res=> res.json())
        .then( d=> setreviewsData(d))
    },[])
    return (
        <>
        <Container>
             <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow,Autoplay, Pagination]}
        className="mySwiper"
      >
        {
            reviewsData.map(review=>     <SwiperSlide key={review.id}>
                <ReviewsCard review={review}></ReviewsCard>
        </SwiperSlide>)
        }
    
      
       
      </Swiper>
        </Container>
   
    </>
    );
};

export default Reviews;