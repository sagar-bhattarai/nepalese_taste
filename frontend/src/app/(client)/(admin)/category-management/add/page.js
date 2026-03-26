import Form from "@/components/admin/category/Form";

const addCategoryPage = () => {

  return (
    <section className="w-max mx-auto">
      <div className="py-2 px-4 mx-auto max-w-2xl lg:py-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new category</h2>
        <Form />
      </div>
    </section>
  )
}

export default addCategoryPage