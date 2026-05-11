"use client"
import { toast } from "react-toastify";
import { addFavourite } from "@/apis/favourite.api.js";
import { useState } from "react";

const AddToFavourites = ({ product, type = "" }) => {
    const [isFavourite, setIsFavourite] = useState(product.isFavourited);

    const handleAddToFavourite = async () => {
        try {
            const result = await addFavourite({ productId: product._id });
            setIsFavourite(result.isFavourited)

            if (result.isFavourited) {
                toast.success(result?.message);
            } else {
                toast.info(result?.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            {type == "button"
                ?
                <button
                    onClick={handleAddToFavourite}
                    title="Add To Favourite"
                    className={` cursor-pointer flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                    role="button"
                >
                    <svg
                        className="w-5 h-5 -ms-2 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill={(isFavourite) ? "red" : "none"}
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                    </svg>
                    Add to favorites
                </button>
                :
                <button
                    onClick={handleAddToFavourite}
                    title="Add To Favourite"
                    className={`${(isFavourite) ? "text-red-600" : "text-primary"} hover:text-red-600  absolute left-3 top-3 cursor-pointer`}
                    role="button"
                >
                    <svg
                        className="w-5 h-5 -ms-2 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill={(isFavourite) ? "red" : "none"}
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                        />
                    </svg>
                </button>
            }
        </div>
    )
}

export default AddToFavourites