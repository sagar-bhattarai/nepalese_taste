import { FaImage } from "react-icons/fa";
import Filter from "@/components/products/Filter"

const LoadingCard = () => {
    return (
        <div className="font-poppins">
            <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="flex justify-center gap-2">
                            <div className="flex flex-col gap-2 mt-1">
                                <div className="animate-pulse w-24 h-24 bg-gray-500 rounded-md"></div>
                                <div className="animate-pulse w-24 h-24 bg-gray-500 rounded-md"></div>
                            </div>
                            <div className="animate-pulse w-54 h-52 bg-gray-500 rounded-md"></div>
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <div className="flex gap-2 items-end">
                                <h1 className=" rounded-md animate-pulse w-34 h-7 bg-gray-300 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-500" > </h1>
                                <p className=" rounded-md animate-pulse w-20 h-5 bg-gray-300 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-gray-500" > </p>
                            </div>
                            <div className="mt-4 sm:items-start sm:gap-4 sm:flex ">
                                <div className="flex flex-col ">
                                    <p className=" rounded-md animate-pulse w-34 h-10 bg-gray-400  text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-gray-400"> </p>
                                    <p className=" rounded-md mt-2 animate-pulse w-20 h-5 bg-gray-400 text-xs font-normal line-through text-gray-900  dark:text-gray-400"></p>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <div className="animate-pulse rounded-md w-30 h-5 bg-gray-200  flex items-center gap-2 mt-2 "> </div>
                                    <div className="animate-pulse rounded-md w-10 h-5 bg-gray-200  flex items-center gap-2 mt-2 "> </div>
                                    <div className="animate-pulse rounded-md w-30 h-5 bg-gray-200  flex items-center gap-2 mt-2 "> </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                                <label className=" text-gray-500" >Quantity</label>
                                <div className="flex gap-2">
                                    <div className=" rounded-full animate-pulse w-5 h-5 bg-gray-400 " ></div>
                                    <div className=" rounded-full animate-pulse w-5 h-5 bg-gray-400 " ></div>
                                    <div className=" rounded-full animate-pulse w-5 h-5 bg-gray-400 " ></div>
                                </div>
                                <div className="flex gap-2">
                                    <h1 className=" rounded-md animate-pulse w-40 h-12 bg-gray-300 "></h1>
                                    <h1 className=" rounded-md animate-pulse w-40 h-12 bg-purple-300 "></h1>
                                </div>
                            </div>

                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                            <p className="rounded-md animate-pulse w-full h-5 bg-gray-500 mb-6 text-gray-500 dark:text-gray-400"> </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

const productsLoading = () => {
    return (<LoadingCard />)
}

export default productsLoading