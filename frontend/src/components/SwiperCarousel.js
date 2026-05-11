"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import productPlaceHolder from "../../public/product_placeholder.jpg"

// import { Carousel } from 'nuka-carousel';

import Image from 'next/image';
import banner1 from "../../public/banner/banner1.jpg"
import banner2 from "../../public/banner/banner2.jpg"
import banner3 from "../../public/banner/banner3.jpg"
import banner4 from "../../public/banner/banner4.jpg"


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const SwiperCarousel = ({ products, itemsToShow = 1, height, size }) => {
  
  function CarouselImage({ pImg, title, height, id }) {

    return (
      // <div className={`relative h-[${height + "px"}]  w-full`}>
      <div style={{ height }} className="image relative w-full cursor-pointer">
        <Link href={`/products/${id}`}>
          <Image
            // src={pImg ? pImg[0] : productPlaceHolder}
            src={pImg}
            alt={title}
            fill
            className="object-cover"
          />

          <div className="content absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center text-2xl py-3">
            {title}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      autoHeight={true}
      slidesPerView={itemsToShow}
      className={`${size + "Carousel"} w-full `}
    >

      {(products && products.length > 0)
        ?
        products?.map((item) => (
          <SwiperSlide key={item._id}>
            <CarouselImage title={item?.productDescription} pImg={item?.productImage || null} height={height} id={item._id}/>
          </SwiperSlide>
        ))
        :
        <>
          <SwiperSlide>
            <CarouselImage title="" pImg={banner1} height={height} id="#"/>
          </SwiperSlide>

          <SwiperSlide>
            <CarouselImage title="" pImg={banner2} height={height}  id="#"/>
          </SwiperSlide>

          <SwiperSlide>
            <CarouselImage title="" pImg={banner3} height={height}  id="#"/>
          </SwiperSlide>

          <SwiperSlide>
            <CarouselImage title="" pImg={banner4} height={height} id="#"/>
          </SwiperSlide>
        </>
      }


    </Swiper>
  );
};

export default SwiperCarousel;







{/*
  
  

    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      autoHeight={true}
      // breakpoints={{
      //   0: {
      //     slidesPerView: 1,
      //   },
      //   640: {
      //     slidesPerView: 1,
      //   },
      //   768: {
      //     slidesPerView: 2,
      //   },
      //   1024: {
      //     slidesPerView: 3,
      //   },
      // }}
      slidesPerView={itemsToShow}
      className={`${size + "Carousel"} w-full `}
    >
  

*/}
