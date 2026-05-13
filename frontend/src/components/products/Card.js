"use client"
import Link from "next/link";
import Image from "next/image";
import pimage from "@/../public/product-banner.png";
import AddToCart from "./AddToCart";
import AddToFavourites from "./AddToFavourites.js";
import { useSelector } from "react-redux";
import StarDisplay from "../testimonial/StarDisplay.js";


const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth?.user?.userData);

  return (
    <div className="transition duration-200 hover:bottom-1 relative w-full h-max max-w-[9.5rem] md:max-w-[16rem] md:min-w-[245px] bg-neutral-primary-soft p-4 border dark:border-gray border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-900 bg-white">
      {user && <AddToFavourites product={product} />}
      {product.brandName &&
        <p className="brand absolute rounded-xl text-sm right-[10px] bg-amber-600 dark:text-black text-white px-3 py-0.5 " >{product.brandName}</p>
      }
      <Link href={`/products/${product._id}`}>
        <Image className="rounded-base mb-6 max-h-50" src={product.productImage ? product.productImage[0] : pimage} alt="product image" height={200} width={200} />
        {/* <Image className="rounded-base mb-6 min-h-[10rem]" src={pimage} alt="product image" height={300} width={200} /> */}
      </Link>
      <div>
        <div className="flex flex-col md:flex-row md:items-center space-x-3 mb-2">
          <StarDisplay rating={product.totalReviews} size={25} />
          <span className="w-max dark:text-gray-600 border dark:border-gray border-gray-300 text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">{product.totalReviews || 0} out of 5</span>
        </div>
        <div className="flex flex-col">
          <Link key={product._id} href={`/products/${product._id}`} className="dark:text-gray-600 text-md text-heading font-bold tracking-tight">{product.productName}</Link>
          <span className="dark:text-gray-600 text-xs font-medium py-0.5 px-2 dark:bg-purple-100/10 bg-fuchsia-100  text-fuchsia-900 rounded-md w-max">category name</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="dark:text-gray-600 text-xl font-bold text-heading">RS.{product?.productPrice ?? "N/A"} <span className=" text-sm font-light line-through">Rs.old price</span></span>
          <AddToCart product={product} quantity={1} type={'circle'} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard