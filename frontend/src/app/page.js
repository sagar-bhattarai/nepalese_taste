"use client";
import NukaCarousel from "@/components/NukaCarousel";
import Image from "next/image";
import home_banner from "../../public/banner/home_banner.jpg";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "@/apis/product.api";
import Card from "@/components/products/Card";


export default function HomePage() {
  const [response, setResponse] = useState()
  useEffect(() => {
    const getProducts = async () => {
      let data = await fetchAllProducts();
      setResponse(data)
      console.log(data)
    }
    getProducts()
  }, [])

  return (
    <div className="mx-auto pt-0">
      <NukaCarousel />
      <section className="section1 mx-auto max-w-4/5 my-5">
        <h1 className="text-3xl">Hot Deals</h1>
        <div className="flex gap-2 py-1">
          {response?.products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section className="section2 mx-auto max-w-4/5 my-5">
        <h1 className="text-3xl">Most Liked</h1>
        <div className="flex gap-2 py-1">
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
      <section className="section2 mx-auto max-w-4/5 my-5">
        <h1 className="text-3xl">Testinomials</h1>
        <div> </div>
      </section>
      <section className="section2 mx-auto max-w-4/5 my-5">
        <h1 className="text-3xl">Recommended</h1>
        <div className="flex gap-2 py-1">
          {response?.products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
