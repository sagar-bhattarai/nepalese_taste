
// import { getUserById } from "@/apis/user.api";
import Form from "@/components/admin/users/Form";

const updateUserPage = async ({ params }) => {
  const id = (await params).id;
  // const user = await getUserById(id);

  return (
    <section className="w-max mx-auto">
      <div className="py-2 px-4 mx-auto max-w-2xl lg:py-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update user</h2>
        {/* <Form  user={user?.result}/> */}
        <Form id={id}/>
      </div>
    </section>
  )
}

export default updateUserPage