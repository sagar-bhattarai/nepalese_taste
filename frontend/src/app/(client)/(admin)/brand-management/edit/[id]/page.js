import { getBrandById } from "@/apis/brand.api";
import Form from "@/components/admin/brand/Form";

const updateBrandPage = async ({ params }) => {
  const id = (await params).id;
  const brand = await getBrandById(id);

  return (
    <section className="w-max mx-auto">
      <div className="py-2 px-4 mx-auto max-w-2xl lg:py-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update Brand</h2>
        <Form  brand={brand?.result}/>
      </div>
    </section>
  )
}

export default updateBrandPage