import axios from "axios";
import config from "@/config/config";

export const addBrand = async (data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.post(
        `${config.apiUrl}/brands/add`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    return response.data.result;
};

export const fetchAllBrands = async (searchParams) => {
    const sort = (await searchParams)?.sort ?? ""
    const name = (await searchParams)?.name ?? ""
    const page = (await searchParams)?.page ?? ""
    const size = (await searchParams)?.size ?? ""
   
    const response = await axios
        .get(`${config.apiUrl}/brands`, {
            params: { page, size, sort, name },
        });
    return response.data.result;
};

export const getBrandById = async (id) => {
    const response = await axios.get(`${config.apiUrl}/brands/${id}`);
    return response.data;
};

export const updateBrand = async (id, data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.patch(
        `${config.apiUrl}/brands/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    return response.data.result;
};


