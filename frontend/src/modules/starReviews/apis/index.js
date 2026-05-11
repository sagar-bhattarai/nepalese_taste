"use client"
import config from "@/config/config";
import axios from "axios";

const api = axios.create({
    baseURL: config.apiUrl,
});

//  REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    const authToken = localStorage.getItem("accessToken");
    if (authToken) {
        // config = {
        //     headers: {
        //         Authorization: `Bearer ${authToken}`,
        //     },
        // }
        config.headers.Authorization = `Bearer ${authToken}`
    }
    return config;
},(error)=> Promise.reject(error))

//  RESPONSE INTERCEPTOR (IMPORTANT)
let isRedirecting = false;
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401  && !isRedirecting) {
            //  token expired / invalid

            alert("Session expired. Please login again.");

            // remove token
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            // redirect user
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;