import axios from "axios";
import config from "@/config/config";

export const addCategory = async (data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.post(
        `${config.apiUrl}/categories/add`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    return response.data.result;
};

export const fetchAllCategories = async (searchParams) => {
    const sort = (await searchParams)?.sort ?? ""
    const min = (await searchParams)?.min ?? ""
    const max = (await searchParams)?.max ?? ""
    const category = (await searchParams)?.category ?? ""
    const brands = (await searchParams)?.brands ?? ""
    const name = (await searchParams)?.name ?? ""
    const page = (await searchParams)?.page ?? ""
    const size = (await searchParams)?.size ?? ""

    // const response = await axios.get(`${config.apiUrl}/categories?page=${page}&size=${size}&sort=${sort}&min=${min}&max=${max}&category=${category}&brands=${brands}&name=${name}`);
    const response = await axios
        .get(`${config.apiUrl}/categories`, {
            params: { page, size, sort, min, max, category, brands, name },
        });
    return response.data.result;
};

export const getCategoryById = async (id) => {
    const response = await axios.get(`${config.apiUrl}/categories/${id}`);
    return response.data;
};

export const updateCategory = async (id, data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.patch(
        `${config.apiUrl}/categories/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    return response.data.result;
};


/*    suggestion from Ai

export const fetchAllCategories = async (searchParams) => {
  const sort = searchParams?.sort ?? "";
  const min = searchParams?.min ?? "";
  const max = searchParams?.max ?? "";
  const category = searchParams?.category ?? "";
  const brands = searchParams?.brands ?? "";
  const name = searchParams?.name ?? "";

  const queryParams = new URLSearchParams({
    sort, min, max, category, brands, name
  }).toString();

  const response = await axios.get(`${config.apiUrl}/categories?${queryParams}`);
  return response.data.result.data;
};

*/ 