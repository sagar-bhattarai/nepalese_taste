import Form from "@/components/admin/products/Form";
import { fetchAllCategories } from "@/apis/category.api";

const addProductPage = async () => {
  const categories = await fetchAllCategories();

  return (
    <section className="w-max mx-auto">
      <div className="py-2 px-4 mx-auto max-w-2xl lg:py-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
        <Form categories={categories.categories}/>
      </div>
    </section>
  )
}

export default addProductPage