// hooks/useCategoryProducts.js

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchAllProducts } from "@/apis/product.api";

const DEFAULT_SORT = JSON.stringify({ createdAt: -1 });

const useCategoryProducts = (categoryName) => {
    const [products, setProducts] = useState();
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(DEFAULT_SORT);
    const [searchByName, setSearchByName] = useState("");
    const [searchByBrand, setSearchByBrand] = useState([]);

    const searchParams = useSearchParams();
    const router = useRouter();

    // ================= FETCH PRODUCTS =================
    const fetchProducts = async () => {
        try {
            const params = Object.fromEntries(searchParams.entries());

            const brands = searchParams.getAll("brand");

            const query = {
                category: categoryName,
                ...params,
                brand: brands,
            };

            const res = await fetchAllProducts(query);

            setProducts(res);
        } catch (error) {
            console.log(error);
        }
    };

    // ================= FETCH ON QUERY CHANGE =================
    useEffect(() => {
        fetchProducts();
    }, [searchParams]);

    // ================= UPDATE QUERY PARAMS =================
    const updateQueryParams = ({ key, value, isMultiple = false, }) => {
        const params = new URLSearchParams(searchParams.toString());

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

    // ================= SORT =================
    const handleSortChange = (value) => {
        setSort(value);
        updateQueryParams({  key: "sort",  value,});
    };

    // ================= SEARCH NAME =================
    const handleSearchByName = (value) => {
        setSearchByName(value);
        updateQueryParams({ key: "name", value, });
    };

    // ================= BRAND FILTER =================
    const handleBrandChange = (brand) => {
        let updatedBrands = [...searchByBrand];

        if (updatedBrands.includes(brand)) {
            updatedBrands = updatedBrands.filter(
                (item) => item !== brand
            );
        } else {
            updatedBrands.push(brand);
        }

        setSearchByBrand(updatedBrands);

        updateQueryParams({
            key: "brand",
            value: updatedBrands,
            isMultiple: true,
        });
    };

    // ================= PAGINATION =================
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);

        const params = new URLSearchParams(searchParams.toString());

        params.set("page", pageNumber);

        router.push(`?${params.toString()}`);
    };

    return {
        products,
        page,
        sort,
        searchByName,
        searchByBrand,

        setPage,

        handleSortChange,
        handleSearchByName,
        handleBrandChange,
        handlePageChange,
    };
};

export default useCategoryProducts;