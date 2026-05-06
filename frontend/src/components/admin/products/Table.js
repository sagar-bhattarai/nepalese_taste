import Image from "next/image";
import Link from "next/link"
import product_placeholder from "../../../../public/product_placeholder.jpg";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ProductTable = ({products }) => {
    // console.log("products",products)
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
                            Product
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Stock
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Brand
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Rating
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Updated At
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>

                    {products?.map((product) => (
                        <tr key={product._id} className={` ${!product.isActive && "bg-neutral-400"} border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700`}>
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
                                    src={!product.productImage ? product_placeholder : product.productImage[0]}
                                    alt={product.productName}
                                    className="w-8 h-8 mr-3 object-cover"
                                    height={100}
                                    width={100}
                                />
                                {product.productName}
                            </th>
                            <td className="px-4 py-2">
                                <span className="bg-primary-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                    {product.categoryName}
                                </span>
                            </td>
                            <td className={`${!product.isActive && "py-0"} px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                                <div className="flex items-center">
                                    <div className={`inline-block w-4 h-4 mr-2 rounded-full
                                        ${(product.productStock <= 5) && "bg-red-700"} 
                                        ${(product.productStock < 10 && product.productStock > 5) && "bg-yellow-600"} 
                                        ${(product.productStock >= 10) && "bg-green-700"} `}></div>
                                    {product.productStock}
                                </div>
                                {!product.isActive && <span className="text-xs ml-6">inActive</span>}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.productPrice}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.brand}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex items-center">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-gray-500 dark:text-gray-600">
                                        5.0
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {new Date(product.updatedAt).toLocaleDateString("en-CA")}
                            </td>
                            <td className=" px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex justify-center items-center">
                                    <Link className="mr-2 hover:text-yellow-700 cursor-pointer" href={`/product-management/edit/${product._id}`}>
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
