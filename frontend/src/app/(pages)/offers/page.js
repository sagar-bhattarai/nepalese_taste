"use client"
import Filter from "@/components/products/Filter";
import Card from "@/components/products/Card";
import { fetchAllProducts } from "@/apis/product.api";
import { useEffect, useState } from "react";




const offersPage = () => {
  const [product, setProduct] = useState();

  const productLimit = 5;
  const [size, setSize] = useState(productLimit);

  const getProducts = async () => {
    try {
      const response = await fetchAllProducts({ size });
      setProduct(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_4fr] px-4 gap-1 lg:py-16 ">
      {/* <Filter /> */}
      <section className="flex gap-1">
        {product?.products?.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </section>
    </div>
  )
}

export default offersPage




















// import Filter from "@/components/products/Filter";
// import Card from "@/components/products/Card";
// import { fetchAllProducts } from "@/apis/product.api";

// export const metadata = {
//   title: "product | Ecommerce",
//   description: "product | Ecommerce",
// };

// const getProducts = async (searchParams) => {
//   try {
//     return await fetchAllProducts(searchParams);
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// const offersPage = async ({ ...searchParams }) => {
//   console.log("searchParams",searchParams)

//   const response = await getProducts(searchParams);
//   console.log(response)
//   return (
//     <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_4fr] px-4 gap-1 lg:py-16 ">
//       {/* <Filter /> */}
//       <section className="flex gap-1">
//         {response.products.map((product) => (
//           <Card  key={product._id} product={product} />
//         ))}
//       </section>
//     </div>
//   )
// }

// export default offersPage