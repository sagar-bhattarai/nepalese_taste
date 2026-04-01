import axios from "axios";
import config from "@/config/config";
import api from "."

/*    suggestion from Ai */
export const fetchAllOrders = async (searchParams) => {
    const sort = searchParams?.sort ?? "";
    const min = searchParams?.min ?? "";
    const max = searchParams?.max ?? "";

    const queryParams = new URLSearchParams({ sort, min, max }).toString();

    const response = await axios.get(`${config.apiUrl}/orders/all`);
    return response.data.result;
};

export const getOrderById = async ({ id }) => {
    const response = await api.get(`/orders/order/${id}`)
    return response.data;
};

export const updateOrder = async (id, data) => {
    const response = await api.patch(`/orders/update/${id}`, data );
    return response.data.data;
};
