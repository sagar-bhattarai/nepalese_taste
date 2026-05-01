import axios from "axios";
import config from "@/config/config";
import api from "."

/*    suggestion from Ai */
// api for client component
export const fetchAllOrders = async (searchParams) => {
    const sort = searchParams?.sort ?? "";
    const min = searchParams?.min ?? "";
    const max = searchParams?.max ?? "";

    const queryParams = new URLSearchParams({ sort, min, max }).toString();
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.get(`${config.apiUrl}/orders/all?${queryParams}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        },
    );
    return response.data.result;
};

// api for server component
export const addOrder = async (data) => {
    try {
        const response = await api.post(`/orders/add`, data);
        return response.data?.result?.data || response?.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// api for client component
export const getOrderById = async ({ id }) => {
    const response = await axios.get(`${config.apiUrl}/orders/order/${id}`)
    return response.data;
};

// api for server component
export const updateOrderStatus = async (id, data) => {
    const response = await api.patch(`/orders/updateStatus/${id}`, data);
    return response;
};

// api for server component
export const orderPaymentConfirmed = async (id, data) => {
    const response = await api.patch(`/orders/paymentStatus/${id}`, data);
    return response;
};


// api for server component
export const payViaCash = async (id) => {
    // console.log(id)
    const response = await api.post(`/orders/${id}/payment/cash`);
    return response.data.result;
};


// api for server component
export const payViaStripe = async (id) => {
    const response = await api.post(`/orders/${id}/payment/stripe`);
    return response.data.result;
};
