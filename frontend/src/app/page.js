"use client";
import SwiperCarousel from "@/components/SwiperCarousel";
import Image from "next/image";
import home_banner from "../../public/banner/home_banner.jpg";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/apis/product.api";
import { fetchAllTestimonials } from "@/apis/testimonial.api"
import Card from "@/components/products/Card";
import TestimonialCarousel from "@/components/TestimonialCarousel";


export default function HomePage() {
  const [response, setResponse] = useState();
  const [testimonials, settestimonials] = useState();

  const productLimit = 5;
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(productLimit);

  const getProducts = async () => {
    let data = await fetchAllProducts({ page, size });
    setResponse(data)
  }

  const allTestimonials = async () => {
    const response = await fetchAllTestimonials({ page, size: 12 });
    settestimonials(response.testimonials)
  }
  useEffect(() => {
    getProducts()
    allTestimonials()
  }, [])


  return (
    <div className="mx-auto pt-0">    
      {/* <SwiperCarousel products={response?.products} itemsToShow={1} height={370} size={"big"}/> */}
      <SwiperCarousel products={false} itemsToShow={1} height={370} size={"big"} />
      <section className="section1 mx-5 md:mx-auto w-full md:max-w-4/5 my-5">       
        <h1 className="text-3xl mb-4">Hot Deals</h1>
        <div className="flex flex-wrap justify-center xl:flex-nowrap xl:justify-between gap-2 py-1">
          {response?.products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section className="section2 mx-5 md:mx-auto w-full md:max-w-4/5 my-5">
        <h1 className="text-3xl mb-4">Most Liked</h1>
        <div className="flex flex-wrap justify-center xl:flex-nowrap xl:justify-between gap-2 py-1">
          {response?.products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section className="homeBanner w-full my-5">
        <Image
          className="max-h-[300px] w-full"
          src={home_banner}
          alt="famous nepali food"
          height={300}
          width={700}
        />
      </section>
      <section className="section3 mx-5 md:mx-auto w-full md:max-w-4/5 my-5">
        <h1 className="text-3xl mb-4">testimonials</h1>
        <div className="mx-auto mb-14">                        
          <TestimonialCarousel testimonials={testimonials} />                           
        </div>                      
      </section>
      <section className="section4 mx-5 md:mx-auto w-full md:max-w-4/5 my-5">     
        <h1 className="text-3xl mb-4">Recommended</h1>    
        <div className="flex flex-wrap justify-center xl:flex-nowrap xl:justify-between gap-2 py-1"> 
          {response?.products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
