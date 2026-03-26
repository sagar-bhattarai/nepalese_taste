import config from "@/config/config";
import axios from "axios";

export const fetchAllMedias = async ({ page = 1, search = "" } = {}) => {
  try {
    let authToken = null;

    if (typeof window !== "undefined") {
      authToken = localStorage.getItem("accessToken");
    }

    const response = await axios.get(
      `${config.apiUrl}/medias`,
      {
        params: { page, search },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("Fetch Media Error:", error.response || error);
    return null;
  }
};


export const deleteMedia = async (public_id, resource_type) => {
  try {
    let authToken = null;

    if (typeof window !== "undefined") {
      authToken = localStorage.getItem("accessToken");
    }

    const response = await axios.delete(
      `${config.apiUrl}/medias/${public_id}`,
      {
        data: {
          public_id: public_id,
          resource_type: resource_type,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("Fetch Media Error:", error.response || error);
    return null;
  }
};