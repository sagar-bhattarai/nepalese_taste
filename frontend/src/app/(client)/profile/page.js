import { EDIT_PROFILE_ROUTE } from "@/constants/routes"
import Image from "next/image"
import Link from "next/link"
import userDummy from "../../../../public/user_placeholder.png"

const profilePage = () => {
  return (
    <div className="p-4">
      <div className="h-30 w-30">
        <Image src={userDummy} alt="profile image" />
      </div>     
      <div className="flex justify-between items-center gap-2 rounded-md p-4 my-2">
        <div className="left min-w-3/6">
          <div className="mb-2">
            <label className="dark:text-gray-400" >Name</label>
            <div className="ml-2 text-gray-600">test</div>
          </div>
          <div className="mb-2">
            <label className="dark:text-gray-400 ">Email</label>
            <div className="ml-2 text-gray-600">test</div>
          </div>
          <div className="mb-2">
            <label className="dark:text-gray-400 ">Phone</label>
            <div className="ml-2 text-gray-600">test</div>
          </div>
        </div>
        <div className="right min-w-3/6">
          <div className="mb-2">
            <label className="dark:text-gray-400 ">Gender</label>
            <div className="ml-2 text-gray-600">test</div>
          </div>
          <div className="mb-2">
            <label className="dark:text-gray-400 ">Bio</label>
            <div className="ml-2 text-gray-600">test</div>
          </div>
          <div className="mb-2">
            <label className="dark:text-gray-400 ">Address</label>
            <div className="ml-2 text-gray-600">test</div>
          </div>
        </div>
      </div>
      <Link href={EDIT_PROFILE_ROUTE} className="py-2 px-4 text-sm dark:text-gray-400 hover:text-primary border rounded-md border-purple-500 hover:border-primary">Edit Profile</Link>
    </div>
  )
}

export default profilePage