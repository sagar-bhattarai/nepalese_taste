import { getProductById } from "@/apis/product.api";
import { fetchAllCategories } from "@/apis/category.api";
import Form from "@/components/admin/products/Form";
import { cookies } from "next/headers";

const updateProductPage = async ({ params }) => {
  const cookieStore = await cookies();
  let userId = cookieStore.get("userId")?.value;

  const id = (await params).id;
  const product = await getProductById(id, userId);
  const categories = await fetchAllCategories();

  return (
    <section className="w-max mx-auto">
      <div className="py-2 px-4 mx-auto max-w-2xl lg:py-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
        <Form product={product?.result} categories={categories.categories} />
      </div>
    </section>
  )
}

export default updateProductPage