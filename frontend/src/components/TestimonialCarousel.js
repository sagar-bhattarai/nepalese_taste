"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Link from "next/link";
import Image from "next/image";

import userPlaceHolder from "../../public/user_placeholder.png";

import { testimonialS_ROUTE } from "@/constants/routes";
import StarDisplay from "./testimonial/StarDisplay";

const TestimonialCarousel = ({
  testimonials,
  itemsToShow = 4,
}) => {

  function CarouselImage({ item }) {
    return (
      <div className="group cursor-pointer w-full border border-slate-600 rounded-2xl p-2 md:p-5 transition-all duration-300 hover:border-primary h-full bg-white dark:bg-[#101828]">
        
        <Link
          className="block"
          href={testimonialS_ROUTE + "#" + item._id}
        >
          
          <div className="flex items-center justify-center p-2  md:p-0 mb-6 w-full h-30 md:h-50 object-cover">
            <Image
              src={
                item?.customer?.profileImage ||
                userPlaceHolder
              }
              alt={`${item?.customer?.userName} profile image`}
              className="rounded-lg text-[8px] text-slate-600"
              width={200}
              height={200}
            />
          </div>

          <div>
            <h6 className="text-sm text-gray-500 font-bold">
              {item?.testimonialTitle}
            </h6>

            <h4 className="dark:text-slate-500 text-gray-900 text-sm font-medium md:leading-8 md:mb-2">
              {item?.testimonialDescription}
            </h4>

            <div className="flex items-center justify-between font-medium">
              <h6 className="text-xs md:text-sm text-gray-500">
                {item?.customer?.userName}
              </h6>

              <StarDisplay
                rating={item?.testimonialRating}
                size="25"
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative px-12 pb-14">
      
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}

        loop={testimonials?.length > itemsToShow}

        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}

        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}

        watchOverflow={true}

        spaceBetween={20}

        slidesPerView={itemsToShow}

        breakpoints={{
          320: {
            // slidesPerView: 1,
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: itemsToShow,
          },
        }}
      >
        {testimonials?.map((item) => (
          <SwiperSlide key={item._id}>
            <CarouselImage item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <button className="custom-prev  cursor-pointer absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-primary hover:bg-purple-800 text-white px-3 py-1 rounded-full">
        ❮
      </button>

      <button className="custom-next cursor-pointer absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-primary hover:bg-purple-800 text-white px-3 py-1 rounded-full">
        ❯
      </button>

      {/* Custom Pagination */}
      <div className="custom-pagination mt-4 md:mt-8 flex justify-center gap-2"></div>
    </div>
  );
};

export default TestimonialCarousel;




















// "use client"
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import userPlaceHolder from "../../public/user_placeholder.png"

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";

// import Link from "next/link";
// import Image from 'next/image';
// import { testimonialS_ROUTE } from "@/constants/routes";
// import StarDisplay from "./testimonial/StarDisplay";



// const TestimonialCarousel = ({ testimonials, itemsToShow = 4 }) => {

//     function CarouselImage({ item }) {

//         return (
//             <div className="group cursor-pointer w-full border border-slate-600 rounded-2xl p-5 transition-all duration-300 hover:border-primary">
//                 <Link className="block" href={testimonialS_ROUTE +"#"+`${item._id}`}>
//                     <div className="flex items-center justify-center mb-6 w-full h-50">
//                         <Image
//                             src={item?.customer?.profileImage || userPlaceHolder || null}
//                             alt={`${item?.customer?.userName} profile image`}
//                             className="rounded-lg object-cover text-[8px] text-slate-600"
//                             width={200}
//                             height={200}
//                         />
//                     </div>
//                     <div className="block">
//                         <h6 className="text-sm text-gray-500 font-bold"> {item?.testimonialTitle}</h6>
//                         <h4 className="dark:text-slate-500 text-gray-900 font-medium leading-8 mb-2">
//                             {item?.testimonialDescription}
//                         </h4>
//                         <div className="flex items-center justify-between font-medium">
//                             <h6 className="text-sm text-gray-500">{item?.customer?.userName}</h6>
//                             <StarDisplay rating={item?.testimonialRating} size="25"/>
//                         </div>
//                     </div>
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <Swiper
//             modules={[Autoplay, Navigation, Pagination]}
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             loop
//             navigation
//             pagination={{ clickable: true }}
//             spaceBetween={20}
//             // autoHeight={true}
//             slidesPerView={itemsToShow}
//             className={`${itemsToShow + "Carousel"} w-full `}
//         >
//             {
//                 testimonials?.map((item) => (
//                     <SwiperSlide key={item._id}>
//                         <CarouselImage item={item} />
//                     </SwiperSlide>
//                 ))
//             }
//         </Swiper>
//     );
// }

// export default TestimonialCarousel