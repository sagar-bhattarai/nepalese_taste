import { FaImage } from "react-icons/fa";
import Filter from "@/components/products/Filter"

const LoadingCard = () => {
    return (
        <div className="relative w-full h-max max-w-[16rem] bg-neutral-primary-soft p-4 bg-white border border-gray-200 rounded-xl shadow-md animate-pulse">
            <div className="absolute right-[10px] rounded-xl w-15 h-6 bg-amber-600"></div>
            <div >
                <div className="flex items-center justify-center rounded-base mb-2 bg-gray-200 min-h-[11rem]">
                    <FaImage className="text-gray-500 text-3xl" />
                </div>
            </div>
            <div>
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-54 h-5 bg-gray-200"></div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="w-32 h-5 bg-gray-200"></div>
                    <div className="w-24 h-5 rounded-md bg-fuchsia-100 py-0.5 "></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="w-28 h-8 bg-gray-200"></div>
                    <div className="w-8 h-8 rounded-full bg-primary "> </div>
                </div>
            </div>
        </div>
    )
}

const productsLoading = () => {
    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_4fr] px-4 gap-1 lg:py-16 ">
            <Filter />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </section>
        </div>
    )
}

export default productsLoading