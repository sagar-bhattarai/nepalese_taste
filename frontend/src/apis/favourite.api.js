import axios from "axios";
import config from "@/config/config";
// import api from "."
import api from "../apis/index.js"

export const addFavourite = async (data) => {
    try {
        // const authToken = localStorage.getItem("accessToken");
        // const response = await axios.post(
        //     `${config.apiUrl}/favourites/add`,
        //     data,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${authToken}`
        //         }
        //     }
        // );

        const response = await api.post(`/favourites/add`, data, {
            withCredentials: true,
        });

        return response?.data?.favourite;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        //  Throw it so caller can handle
        throw new Error(message);
    }
};

export const fetchAllFavourites = async (params) => {
    const {
        sort = "",
        page = "",
        size = "",
        name = "",
        brand = "",
        category = "",
        price = ""
    } = params;

    const token = localStorage.getItem("accessToken");

    const response = await axios.get(
        `${config.apiUrl}/favourites?page=${page}&size=${size}&sort=${sort}&brand=${brand}&price=${price}&name=${name}&category=${category}`,
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data.result;
};

{/*
    
export const fetchAllFavourites = async (searchParams) => {
    const sort = (await searchParams)?.sort ?? ""
    const min = (await searchParams)?.min ?? ""
    const max = (await searchParams)?.max ?? ""
    const favourite = (await searchParams)?.favourite ?? ""
    const page = (await searchParams)?.page ?? ""
    const size = (await searchParams)?.size ?? ""
    const name = (await searchParams)?.name ?? ""
    const brand = (await searchParams)?.brand ?? ""
    const category = (await searchParams)?.category ?? ""
    const token = localStorage.getItem("accessToken");

    console.log(searchParams)

    const response = await axios.get(
        `${config.apiUrl}/favourites?page=${page}&size=${size}&sort=${sort}&min=${min}&max=${max}&favourite=${favourite}&brand=${brand}&name=${name}&category=${category}`,
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.result;

    // const response = await api
    //     .get(`${config.apiUrl}/favourites`, {
    //         params: { page, size, sort, min, max, category, brand, name },
    //     });
    // return response.data.result;

};

    
*/
}

// export const getFavouriteById = async (id) => {
//     const response = await axios.get(`${config.apiUrl}/favourites/${id}`);
//     return response.data;
// };

export const deleteFavourite = async (id) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(
        `${config.apiUrl}/favourites/delete/${id}`,
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return response;
};
