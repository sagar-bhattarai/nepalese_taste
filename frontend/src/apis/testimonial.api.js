import axios from "axios";
import config from "@/config/config";

export const addTestimonial = async (data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.post(
        `${config.apiUrl}/testimonials/add`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    return response.data.result;
};

export const fetchAllTestimonials = async (searchParams) => {
    const sort = (await searchParams)?.sort ?? ""
    const page = (await searchParams)?.page ?? ""
    const size = (await searchParams)?.size ?? ""

    // const response = await axios.get(`${config.apiUrl}/testimonials?page=${page}&size=${size}&sort=${sort}`);
    const response = await axios
        .get(`${config.apiUrl}/testimonials/`, {
            params: { page, size, sort  },
        });
    return response.data.result;
};

export const fetchAllRatings = async () => {
    const response = await axios.get(`${config.apiUrl}/testimonials/ratings`);
    return response.data.result;
};

// export const getTestimonialById = async (id) => {
//     const response = await axios.get(`${config.apiUrl}/testimonials/${id}`);
//     return response.data;
// };

export const deleteTestimonial = async (id) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.delete(`${config.apiUrl}/testimonials/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    return response.data.message;
};


export const updateTestimonial = async (id, data) => {
    const authToken = localStorage.getItem("accessToken");

    const response = await axios.put(
        `${config.apiUrl}/testimonials/update/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        }
    );

    return response.data.result;
};


/*    suggestion from Ai

export const fetchAlltestimonials = async (searchParams) => {
  const sort = searchParams?.sort ?? "";
  const min = searchParams?.min ?? "";
  const max = searchParams?.max ?? "";
  const testimonial = searchParams?.testimonial ?? "";
  const brands = searchParams?.brands ?? "";
  const name = searchParams?.name ?? "";

  const queryParams = new URLSearchParams({
    sort, min, max, testimonial, brands, name
  }).toString();

  const response = await axios.get(`${config.apiUrl}/testimonials?${queryParams}`);
  return response.data.result.data;
};

*/ 