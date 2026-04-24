import Link from "next/link";
import { getProductById } from "../../../apis/product.api";
import ProductActions from "@/components/products/inputAction/ProductActions";
import CommentSection from "@/modules/comments/component/CommentSection ";
import StarDisplay from "@/modules/starReviews/component/StarDisplay";
import StarInput from "@/modules/starReviews/component/StarInput";
import { cookies } from "next/headers";

export const generateMetadata = async ({ params }) => {
    const cookieStore = await cookies();
    let userId = cookieStore.get("userId")?.value;
    if (!userId) userId = "guest";

    const id = (await params).id;
    const product = await getProductById(id, userId);
    return {
        title: product.result?.productName,
    }
}

const productPageById = async ({ params, searchParams }) => {

    const cookieStore = await cookies();
    let userId = cookieStore.get("userId")?.value;
    if (!userId) userId = "guest";

    const id = (await params).id;
    const query = await searchParams;

    const response = await getProductById(id, userId);
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
                                    {/* ⭐ Average rating */}
                                    <StarDisplay rating={product?.averageRating} />
                                    <p>{product?.averageRating?.toFixed(1)} / 5</p>

                                    {/* ⭐ Give rating */}
                                    <StarInput
                                        productId={product._id}
                                        currentRating={product?.userRating || 0} // optional
                                    />
                                    {/* <p
                                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                    >
                                        ({product?.userRating})
                                    </p> */}
                                    <Link
                                        href="#"
                                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-gray-400"
                                    >
                                        {product?.totalReviews} Reviews
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
                    <CommentSection postId={id} />
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