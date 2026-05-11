import api from "."


// api for server component
export const rateTheProduct = async (data) => {
    try {
        const response = await api.post( `/starReviews/rate`, data);
        return response.data?.result;
    } catch (error) {
        throw error.response?.data || error;
    }
};