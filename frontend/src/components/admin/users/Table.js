import Image from "next/image";
import Link from "next/link"
import user_placeholder from "../../../../public/user_placeholder.png";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ProductTable = ({ users }) => {

    return (
        <div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all"
                                    type="checkbox"
                                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Users
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Roles
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Active
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Email Verified
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Address
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="w-4 px-4 py-3">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        // onClick="event.stopPropagation()"
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <Image
                                    src={!user.profileImage ? user_placeholder : user.profileImage}
                                    alt={user.userName}
                                    className="w-8 h-8 mr-3 object-cover"
                                    height={100}
                                    width={100}
                                />
                                {user.userName}
                            </th>
                            <td className="px-4 py-2">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                    {user.userRoles.map((role) => (role + ", "))}
                                </span>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center ml-4">
                                    <div className={`inline-block w-4 h-4 rounded-full
                                        ${(!user.isActive) && "bg-red-700"} 
                                        ${(user.isActive) && "bg-green-700"} `}></div>
                                    {/* {user.isActive ? "true" : "false"} */}
                                </div>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center ml-4">
                                    <div className={`inline-block w-4 h-4 rounded-full
                                        ${(!user.isEmailVerified) && "bg-red-700"} 
                                        ${(user.isEmailVerified) && "bg-green-700"} `}></div>
                                    {/* {user.isEmailVerified ? "true" : "false"} */}
                                </div>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.userEmail}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.userAddress}
                            </td>

                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex justify-center items-center">
                                    <Link className="mr-2 hover:text-yellow-700 cursor-pointer" href={`/user-management/edit/${user._id}`}>
                                        <FaPencilAlt />
                                    </Link>
                                    <button className="hover:text-red-600 cursor-pointer">
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
