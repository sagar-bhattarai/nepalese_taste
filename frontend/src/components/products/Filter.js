"use client";

import { PRODUCTS_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEFAULT_SORT = JSON.stringify({ createdAt: -1 });
const MIN_PRICE = 0;
const MAX_PRICE = 9999999;

const Filter = () => {
    const router = useRouter();
    const [sort, setSort] = useState(DEFAULT_SORT);
    const [category, setCategory] = useState("");
    const [searchByName, setSearchByName] = useState("");
    const [brands, setBrands] = useState([]);
    const [minPrice, setMinPrice] = useState(MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

    const filterProducts = () => {
        const params = new URLSearchParams();

        params.set("sort", sort);
        params.set("category", category);
        params.set("name", searchByName);
        params.set("brands", brands.join(","));
        params.set("min", minPrice);
        params.set("max", maxPrice);

        // router.push(`?sort=${sort}`);
        router.push(`?${params.toString()}`);
    };

    const handleBrandChange = (brand) => {
        setBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((item) => item != brand)
                : [...prev, brand]
        )
    }

    const resetFilter = () => {
        setSort(DEFAULT_SORT)
        setCategory("")
        setSearchByName("")
        setBrands([])
        setMinPrice(MIN_PRICE)
        setMaxPrice(MAX_PRICE)

        router.push(PRODUCTS_ROUTE)
    }
    return (
        <aside className="shadow-md rounded-xl p-4">
            <h3 className="dark:text-primary light:text-black dark:border-gray font-medium text-lg mb-2">Products Filter</h3>
            {/* search */}
            <div className="w-full mt-4">
                <h4 className="dark:text-gray-600 light:text-black dark:border-gray" >Search:</h4>
                <div >
                    <input
                        name="name"
                        id="name"
                        type="text"
                        className="dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 w-full p-1 mt-1 border  rounded-md"
                        onChange={(e) => setSearchByName(e.target.value)} />
                </div>
            </div>
            {/* sort by */}
            <div className="w-full mt-4">
                <h4 className="dark:text-gray-600 light:text-black dark:border-gray">Sort By:</h4>
                <select
                    className="w-full p-1 mt-1 text-sm border dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                    name="sort"
                    id="sort"
                    onChange={(e) => setSort(e.target.value)}>
                    <option value={JSON.stringify({ createdAt: -1 })}>Latest Products</option>
                    <option value={JSON.stringify({ createdAt: 1 })}>Oldest Products</option>
                    <option value={JSON.stringify({ price: -1 })}>Price: High to Low</option>
                    <option value={JSON.stringify({ price: 1 })}>Price: Low to High</option>
                    <option value={JSON.stringify({ name: 1 })}>Name: A - Z</option>
                    <option value={JSON.stringify({ name: -1 })}>Name: Z - A</option>
                </select>
            </div>
            {/* categories */}
            <div className="w-full mt-4">
                <h4 className="dark:text-gray-600 light:text-black dark:border-gray">Categories:</h4>
                <select
                    className="w-full p-1 mt-1 text-sm border dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                    name="category"
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="smartphones">smartphones</option>
                    <option value="laptops">laptops</option>
                    <option value="smartwatches">smartwatches</option>
                </select>
            </div>
            {/* price range */}
            <div className="w-full mt-4">
                <h4 className="dark:text-gray-600 light:text-black dark:border-gray">Price Range:</h4>
                <div >
                    <label className="text-xs text-gray-500" htmlFor="min">Minimum Price</label>
                    <input
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        name="min"
                        id="min"
                        type="number"
                        className="w-full p-1 mt-1 border dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                        onChange={(e) => setMinPrice(e.target.value)} />
                </div>
                <div >
                    <label className="text-xs text-gray-500" htmlFor="max">Maximum Price</label>
                    <input
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        name="max"
                        id="max"
                        type="number"
                        className="w-full p-1 mt-1 border dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                        onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
            </div>
            {/* brand */}
            <div className="w-full mt-4">
                <h4 className="dark:text-gray-600 light:text-black dark:border-gray">Brand:</h4>
                <div className="flex items-center gap-1 ml-1">
                    <input
                        name="apple"
                        id="apple"
                        type="checkbox"
                        className="border dark:accent-primary dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                        onChange={() => handleBrandChange("apple")} />
                    <label className="text-xs text-gray-500" htmlFor="apple">Apple</label>
                </div>
                <div className="flex items-center gap-1 ml-1">
                    <input
                        name="google"
                        id="google"
                        type="checkbox"
                        className="border dark:accent-primary dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                        onChange={() => handleBrandChange("google")} />
                    <label className="text-xs text-gray-500" htmlFor="google">Google</label>
                </div>
                <div className="flex items-center gap-1 ml-1">
                    <input
                        name="samsung"
                        id="samsung"
                        type="checkbox"
                        className="border dark:accent-primary dark:text-gray-600 light:text-black dark:border-gray light:border-gray-300 rounded-md"
                        onChange={() => handleBrandChange("samsung")} />
                    <label className="text-xs text-gray-500" htmlFor="samsung">Samsung</label>
                </div>

            </div>

            <button
                onClick={filterProducts}
                className="transition duration-300 bg-primary hover:bg-purple-900 text-white w-full py-1 rounded-md mt-4 cursor-pointer hover:shadow-md">
                Filter Products
            </button>
            <button
                onClick={resetFilter}
                className="transition duration-300 bg-red-600 hover:bg-red-700 text-white w-full py-1 rounded-md mt-2 cursor-pointer hover:shadow-md">
                Reset Filter
            </button>
        </aside>
    );
};

export default Filter;
