"use client"
import config from "@/config/config";
import axios from "axios";


const api = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true,
});


// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// RESPONSE INTERCEPTOR
let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
    queue.forEach(p => {
        if (error) p.reject(error);
        else p.resolve(token);
    });
    queue = [];
};

api.interceptors.response.use(
    res => res,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    queue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const res = await api.get("/users/token/refresh");

                const newToken = res.data.accessToken;
                
                localStorage.setItem("accessToken", newToken);

                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return api(originalRequest);

            } catch (err) {
                processQueue(err, null);

                localStorage.removeItem("accessToken");
                window.location.href = "/login";

                return Promise.reject(err);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
































// "use client"
// import config from "@/config/config";
// import axios from "axios";

// const api = axios.create({
//     baseURL: config.apiUrl,
// });

// //  REQUEST INTERCEPTOR
// api.interceptors.request.use((config) => {
//     const authToken = localStorage.getItem("accessToken");
//     if (authToken) {
//         // config = {
//         //     headers: {
//         //         Authorization: `Bearer ${authToken}`,
//         //     },
//         // }
//         config.headers.Authorization = `Bearer ${authToken}`
//     }
//     return config;
// },(error)=> Promise.reject(error))

// //  RESPONSE INTERCEPTOR (IMPORTANT)
// let isRedirecting = false;
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401  && !isRedirecting) {
//             //  token expired / invalid

//             alert("Session expired. Please login again.");

//             // remove token
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");

//             // redirect user
//             window.location.href = "/login";
//         }

//         return Promise.reject(error);
//     }
// );

// export default api;