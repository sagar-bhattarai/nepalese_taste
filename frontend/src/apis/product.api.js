import axios from "axios";
import config from "@/config/config";
import api from "."

// api for server component
export const addProduct = async (data) => {
    try {
        const response = await api.post(`/products/add`, data);

        return response.data?.result?.data;
    } catch (error) {
        // console.error("API ERROR:", error);
        throw error.response?.data || error;
    }
};

// api for client component
export const fetchAllProducts = async (searchParams) => {
    const sort = (await searchParams)?.sort ?? ""
    const min = (await searchParams)?.min ?? ""
    const max = (await searchParams)?.max ?? ""
    const category = (await searchParams)?.category ?? ""
    const brands = (await searchParams)?.brands ?? ""
    const name = (await searchParams)?.name ?? ""
    const page = (await searchParams)?.page ?? ""
    const size = (await searchParams)?.size ?? ""

    // const response = await axios.get(`${config.apiUrl}/products?page=${page}&size=${size}&sort=${sort}&min=${min}&max=${max}&category=${category}&brands=${brands}&name=${name}`);
    const response = await api
        .get(`${config.apiUrl}/products`, {
            params: { page, size, sort, min, max, category, brands, name },
        });
    return response.data.result;
};

// api for client component
export const getProductById = async (id, userId) => {

    const response = await axios.get(`${config.apiUrl}/products/product/${id}/${userId}`);
    return response.data;
};

// api for server component
export const updateProduct = async (id, data) => {
    try {
        const response = await api.patch(`/products/update/${id}`, data);

        return response.data.result.data;
    } catch (error) {
        // console.error("API ERROR:", error);
        throw error.response?.data || error;
    }
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/api/products/${id}`)
    return response;
}

export const getProductBrands = async () => {
    const response = await api.get("/api/products/brands");
    return response;
}
export const getProductCategories = async () => {
    const response = await api.get("/api/products/categories");
    return response;
}
/*    suggestion from Ai

export const fetchAllProducts = async (searchParams) => {
  const sort = searchParams?.sort ?? "";
  const min = searchParams?.min ?? "";
  const max = searchParams?.max ?? "";
  const category = searchParams?.category ?? "";
  const brands = searchParams?.brands ?? "";
  const name = searchParams?.name ?? "";

  const queryParams = new URLSearchParams({
    sort, min, max, category, brands, name
  }).toString();

  const response = await axios.get(`${config.apiUrl}/products?${queryParams}`);
  return response.data.result.data;
};

*/ 