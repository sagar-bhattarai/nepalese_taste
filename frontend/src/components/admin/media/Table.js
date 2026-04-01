import Image from "next/image";
import Link from "next/link"
import media_placeholder from "../../../../public/product_placeholder.jpg";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { deleteMedia } from "../../../apis/media.api"
import { toast } from "react-toastify";

const MediaTable = ({ medias }) => {

    const removeMedia = (item) => {
        toast.info(
            ({ closeToast }) => (
                <div>
                    <p>Are you sure you want to delete?</p>

                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => {
                                deleteMedia(item.public_id, item.resource_type)
                                closeToast();
                            }}
                            className="bg-red-500 hover:bg-red-700 rounded-md text-white px-2 py-1 cursor-pointer"
                        >
                            Yes
                        </button>

                        <button
                            onClick={closeToast}
                            className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-md cursor-pointer"
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false, // important
                closeOnClick: false,
            }
        );
    };

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
                            File
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Last Modified
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {medias?.map((media, index) => (
                        <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
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
                                {/* IMAGE */}
                                {media.resource_type === "image" && (
                                    <Image
                                        // src={media.secure_url}
                                        // src={!media.secure_url ? media_placeholder : media.secure_url}
                                        src={!media.secure_url ? media_placeholder : media.secure_url.replace("/upload/", "/upload/w_300,q_auto,f_auto/")}
                                        alt="media"
                                        width={100}
                                        height={100}
                                        className="w-12 h-12 object-cover"
                                    />
                                )}

                                {/* VIDEO */}
                                {media.resource_type === "video" && (
                                    <video
                                        src={media.secure_url}
                                        controls
                                        className="w-12 h-12 object-cover"
                                    />
                                )}
                            </th>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {media.display_name}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {media.resource_type}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {media.bytes}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {media.created_at}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="flex justify-center items-center">
                                    {/* <Link className="mr-2 hover:text-yellow-700 cursor-pointer" href={`/media-management/edit/${media.public_id}`}>
                                        <FaPencilAlt />
                                    </Link> */}
                                    <button
                                        onClick={() => removeMedia(media)}
                                        className="hover:text-red-600 cursor-pointer">
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

export default MediaTable;
