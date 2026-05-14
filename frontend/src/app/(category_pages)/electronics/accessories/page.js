"use client"

import { fetchAllProducts } from "@/apis/product.api";
import ProductCard from "@/components/products/Card";
import ByBrand from "@/components/products/Filters/ByBrand";
import SearchByName from "@/components/products/Filters/SearchByName";
import SortBy from "@/components/products/Filters/SortBy";
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { ImSearch } from "react-icons/im";
import { GrSort } from "react-icons/gr";
import { TbTags } from "react-icons/tb";

const accessoriesPage = () => {
  const [accessories, setAccessories] = useState();

  const searchParams = useSearchParams();
  const router = useRouter();

  const DEFAULT_SORT = JSON.stringify({ createdAt: -1 });
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [page, setPage] = useState(1);
  const [searchByName, setSearchByName] = useState("");
  const [searchByBrand, setSearchByBrand] = useState("");


  // ================= FETCH PRODUCTS =================
  const fetchAccessories = async () => {
    try {
      const params = Object.fromEntries(searchParams.entries());

      // get multiple brands
      const brands = searchParams.getAll("brand");

      const query = {
        ...params,
        brand: brands,
      };

      const res = await fetchAllProducts(query);

      setAccessories(res);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= UPDATE QUERY PARAMS =================
  const updateQueryParams = ({ key, value, isMultiple = false }) => {
    const params = new URLSearchParams(searchParams.toString());

    // for multiple checkbox brands
    if (isMultiple) {
      params.delete(key);

      value.forEach((item) => {
        params.append(key, item);
      });
    } else {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    params.set("page", 1);

    router.push(`?${params.toString()}`);
  };


  // ================= paginate =================
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page);

    router.push(`?${params.toString()}`);
  };

  // ================= SORT =================
  const handleSortChange = (value) => {
    setSort(value);

    updateQueryParams({ key: "sort", value, });
  };

  // ================= SEARCH BY NAME =================
  const handleSearchByName = (value) => {
    setSearchByName(value);

    updateQueryParams({ key: "name", value, });
  };

  // ================= MULTIPLE BRAND CHECKBOX =================
  const handleBrandChange = (brand) => {
    let updatedBrands = [...searchByBrand];

    if (updatedBrands.includes(brand)) {
      updatedBrands = updatedBrands.filter((item) => item !== brand);
    } else {
      updatedBrands.push(brand);
    }

    setSearchByBrand(updatedBrands);

    updateQueryParams({ key: "brand", value: updatedBrands, isMultiple: true, });
  };

  // ================= FETCH ON QUERY CHANGE =================
  useEffect(() => {
    fetchAccessories();
  }, [searchParams, searchByName]);


  return (
    <div className="mx-auto max-w-4/5 my-10">
      <div className="flex justify-between py-3 px-5 mb-4 bg-gray-100/50 dark:bg-purple-100/10 rounded-md">
        <div className="font-bold text-xl text-primary">Accessories</div>

        <div>
          <div className="flex items-center gap-3">
            <button className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              Search
              <ImSearch />
              <SearchByName
                setSort={handleSearchByName}
                classes={"text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"} />
            </button>


            <button className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <GrSort />
              Sort
              <SortBy
                setSort={handleSortChange}
                ItemName={"accessories"}
                classes={"text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"} />
            </button>


            <button className="p-2.5 text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <TbTags />
              <ByBrand
                setCategory={handleBrandChange}
                classes={"text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-y-4">
        {accessories?.products.map((item) => (
          <ProductCard product={item} />
        ))}
      </div>
    </div>
  )
}

export default accessoriesPage