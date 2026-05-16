"use client";
import { ImSearch } from "react-icons/im";
import { GrSort } from "react-icons/gr";
import { TbTags } from "react-icons/tb";
import Pagination from "@/components/Pagination";
import SortBy from "../products/Filters/SortBy";
import SearchByName from "../products/Filters/SearchByName";
import ProductCard from "../products/Card";
// import ByBrand from "../products/Filters/ByBrand";

const HeaderCatPage = ({
    catPageName,
    handleSearchByName,
    handleSortChange,
    catPageProduct,
    page,
    setPage,
}) => {
    return (
        <div className="mx-auto max-w-4/5 my-10">
            <div className="flex justify-between items-center py-3 px-5 mb-4 bg-gray-100/50 dark:bg-purple-100/10 rounded-md">
                <div className="font-bold text-xl text-primary capitalize">
                    {catPageName}
                </div>
                {catPageProduct?.total != 0 &&
                    <div>
                        <div className="flex items-center gap-3">
                            <button className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                Search
                                <ImSearch />
                                <SearchByName
                                    setSearchByName={handleSearchByName}
                                    classes={
                                        "text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"
                                    }
                                />
                            </button>

                            <button className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                <GrSort />
                                Sort
                                <SortBy
                                    setSort={handleSortChange}
                                    ItemName={catPageName}
                                    classes={
                                        "text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"
                                    }
                                />
                            </button>
                            {/* 
            <button className="p-2.5 text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <TbTags />
              <ByBrand
                handleBrandChange={handleBrandChange}
                classes={"text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"} />
            </button> 
            */}
                        </div>
                    </div>
                }
            </div>
            {catPageProduct?.total != 0 ? (
                <>
                    <div className="flex justify-between flex-wrap gap-y-4">
                        {catPageProduct?.products.map((item) => (
                            <ProductCard key={item._id} product={item} />
                        ))}
                    </div>
                    <Pagination
                        page={page}
                        setPage={setPage}
                        overAllTotal={catPageProduct?.total}
                        LIMIT={12}
                    />
                </>
            ) : (
                <div className="text-center p-5 border border-slate-600 rounded-md"> Products Not Found. </div>
            )}
        </div>
    );
};

export default HeaderCatPage;
