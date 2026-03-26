import axios from "axios";
import config from "@/config/config";

/*    suggestion from Ai */
export const fetchAllOrders = async (searchParams) => {
    const sort = searchParams?.sort ?? "";
    const min = searchParams?.min ?? "";
    const max = searchParams?.max ?? "";

    const authToken = localStorage.getItem("accessToken");

    const queryParams = new URLSearchParams({ sort, min, max }).toString();

    const response = await axios.get(`${config.apiUrl}/orders/all`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data.result;
};

export const getOrderById = async ({ id }) => {
    const authToken = localStorage.getItem("accessToken");
    const response = await axios.get(`${config.apiUrl}/orders/order/${id}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
    return response.data;
};

export const updateOrder = async (id, data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.patch(
        `${config.apiUrl}/orders/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
    );

    return response.data.data;
};
