import { getCategoryById } from "@/apis/category.api";
import Form from "@/components/admin/category/Form";

const updateCategoryPage = async ({ params }) => {
  const id = (await params).id;
  const category = await getCategoryById(id);

  return (
    <section className="w-max mx-auto">
      <div className="py-2 px-4 mx-auto max-w-2xl lg:py-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update category</h2>
        <Form  category={category?.result}/>
      </div>
    </section>
  )
}

export default updateCategoryPage