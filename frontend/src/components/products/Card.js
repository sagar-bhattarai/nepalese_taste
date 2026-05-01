"use client"
import Link from "next/link";
import Image from "next/image";
import pimage from "@/../public/product-banner.png";
import AddToCart from "./AddToCart";
import AddToFavourites from "./AddToFavourites";
import { useSelector } from "react-redux";


const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth?.user?.userData);

  return (
    <div className="transition duration-200 hover:bottom-1 relative w-full h-max max-w-[16rem] min-w-[245px] bg-neutral-primary-soft p-4 border dark:border-gray border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-900 bg-white">
      {user && <AddToFavourites product={product} />}
      <p className="brand absolute rounded-xl text-sm right-[10px] bg-amber-600 dark:text-black text-white px-3 py-0.5 " >{product.brand}</p>
      <Link href={`/products/${product._id}`}>
        {/* <Image className="rounded-base mb-6 min-h-[10rem]" src={product.images[0]} alt="product image"  height={300} width={200}/> */}
        <Image className="rounded-base mb-6 min-h-[10rem]" src={pimage} alt="product image" height={300} width={200} />
      </Link>
      <div>
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <svg className="w-5 h-5 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" /></svg>
            <svg className="w-5 h-5 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" /></svg>
            <svg className="w-5 h-5 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" /></svg>
            <svg className="w-5 h-5 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" /></svg>
            <svg className="w-5 h-5 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" /></svg>
          </div>
          <span className="dark:text-gray-600 border dark:border-gray border-gray-300 text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">4.8 out of 5</span>
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