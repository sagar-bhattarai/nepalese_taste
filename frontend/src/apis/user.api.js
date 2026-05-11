import axios from "axios";
import config from "@/config/config";

/*    suggestion from Ai */
export const fetchAllUsers = async (searchParams) => {
    const sort = searchParams?.sort ?? "";
    const min = searchParams?.min ?? "";
    const max = searchParams?.max ?? "";
    const page = (await searchParams)?.page ?? ""
    const size = (await searchParams)?.size ?? ""

    const authToken = localStorage.getItem("accessToken");

    const queryParams = new URLSearchParams({ page, size, sort, min, max }).toString();

    const response = await axios.get(`${config.apiUrl}/users?${queryParams}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data.result;
};

export const addUser = async (data) => {
    const authToken = localStorage.getItem("accessToken");
    const response = await axios.post(`${config.apiUrl}/users/add`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data.result.data;
};

// export const getUserById = async ({ id }) => {
export const getUserById = async (id ) => {
    const authToken = localStorage.getItem("accessToken");
    const response = await axios.get(`${config.apiUrl}/users/user/${id}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
    return response.data;
};

export const updateUser = async (id, data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.patch(
        `${config.apiUrl}/users/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
    );

    return response.data.data;
};
