import axios from "axios";
import config from "@/config/config";
// import api from "."
import api from "../apis/index.js"

 // api for client component - Content-Based)  
export const trackViews = async ({ id }) => {
    const response = await api.post(`/add?productId=${id}`, data);
    return response.data;
};


 // api for client component - Content-Based)  
export const fetchAllRecommendations = async (data) => {
    try {
        const response = await api.post(`/recommendations/all`, data);
        return response.data.result;
    } catch (error) {
        throw error.response?.data || error;
    }
};




// // api for server component
// export const fetchAllRecommendations = async (data) => {
//     try {
//         // const response = await axios.get(`${config.apiUrl}/recommendations?productId=${id}`)
//         const response = await axios.get(`${config.apiUrl}/recommendations/all`)
//         return response.data?.result?.data;
//     } catch (error) {
//         throw error.response?.data || error;
//     }
// };