"use client"
import Filter from "@/components/products/Filter";
import Card from "@/components/products/Card";
import { fetchAllProducts } from "@/apis/product.api";
import { useEffect, useState, use } from "react";


const getProducts = async (searchParams) => {
  try {
    return await fetchAllProducts(searchParams);
  } catch (error) {
    throw new Error(error)
  }
}

const productPage = ({ searchParams }) => {
  const params = use(searchParams); 
  const [response, setResponse] = useState()

  useEffect(() => {
    const loadProducts = async () => {
      const result = await getProducts(searchParams);
      setResponse(result)
    }
    loadProducts();
  }, [params]);

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_4fr] px-4 gap-1 lg:py-16 ">
      <Filter />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {response?.products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </section>
    </div>
  )
}

export default productPage



























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

// const productPage = async ({ ...searchParams }) => {
//   const response = await getProducts(searchParams);
//   return (
//     <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_4fr] px-4 gap-1 lg:py-16 ">
//       <Filter />
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
//         {response.products.map((product) => (
//           <Card key={product._id} product={product} />
//         ))}
//       </section>
//     </div>
//   )
// }

// export default productPage