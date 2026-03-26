import axios from "axios";
import config from "@/config/config";

export const addProduct = async (data) => {
    const authToken = localStorage.getItem("accessToken");

    try {
        const response = await axios.post(
            `${config.apiUrl}/products/add`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response.data?.result?.data;
    } catch (error) {
        // console.error("API ERROR:", error);
        throw error.response?.data || error;
    }
};

export const fetchAllProducts = async (searchParams) => {
    const sort = (await searchParams)?.sort ?? ""
    const min = (await searchParams)?.min ?? ""
    const max = (await searchParams)?.max ?? ""
    const category = (await searchParams)?.category ?? ""
    const brands = (await searchParams)?.brands ?? ""
    const name = (await searchParams)?.name ?? ""

    const response = await axios.get(`${config.apiUrl}/products?sort=${sort}&min=${min}&max=${max}&category=${category}&brands=${brands}&name=${name}`);
    return response.data.result;
};

export const getProductById = async (id) => {

    const response = await axios.get(`${config.apiUrl}/products/product/${id}`);
    // return response.data.result.data;
    return response.data;
};

export const updateProduct = async (id, data) => {
    const authToken = localStorage.getItem("accessToken");
    try {
    const response = await axios.patch(
        `${config.apiUrl}/products/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    return response.data.result.data;
        } catch (error) {
        // console.error("API ERROR:", error);
        throw error.response?.data || error;
    }
};


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