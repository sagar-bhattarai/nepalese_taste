import Link from "next/link";
import { getProductById } from "../../../apis/product.api";
import ProductActions from "@/components/products/inputAction/ProductActions";
import CommentSection from "@/modules/comments/CommentSection ";

export const generateMetadata = async ({ params }) => {
    const id = (await params).id;
    const product = await getProductById(id);
    return {
        title: product.result?.productName,
    }
}

const productPageById = async ({ params, searchParams }) => {

    const id = (await params).id;
    const query = await searchParams;

    const response = await getProductById(id);
    const product = response.result;


    return (
        <div className="font-poppins">
            <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                            <img className="w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="" />
                            <img className="w-full hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
                            {product.productImage}
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1
                                className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-500"
                            >
                                {product.productName}<span className="text-xs border rounded-md px-1 py-0.5 ml-2">{product.categoryId.categoryName}</span>
                            </h1>
                            <div className="mt-4 sm:items-start sm:gap-4 sm:flex">
                                <div className="flex flex-col ">
                                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-gray-400">
                                        Rs. {product.productPrice}
                                    </p>

                                    <p className="text-xs font-normal line-through text-gray-900  dark:text-gray-400">
                                        Rs. {product?.oldPrice ?? "N/A"}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 mt-2 ">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                    </div>
                                    <p
                                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                    >
                                        (5.0)
                                    </p>
                                    <Link
                                        href="#"
                                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-gray-400"
                                    >
                                        345 Reviews
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <label className="text-gray-500" >Quantity</label>
                                <ProductActions product={product} />
                            </div>

                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                {product.productDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* products Reviews and comments */}
            <section className=" py-4 bg-gray-100/50 md:py-8 dark:bg-gray-800">
                <div className="max-w-4/5 m-auto flex flex-col ">
                    <p className="text-xl font-extrabold text-gray-900 sm:text-2xl dark:text-gray-400">
                        Comments
                    </p>
                    <CommentSection  postId={id} />
                </div>
            </section>
            {/* Recommendation products */}
            <section className=" py-4 bg-white md:py-8 dark:bg-gray-900">
                <div className="max-w-4/5 m-auto flex flex-col ">
                    <p className="text-xl font-extrabold text-gray-900 sm:text-2xl dark:text-gray-400">
                        Recommended products
                    </p>
                </div>
            </section>
        </div>
    )
}

export default productPageById