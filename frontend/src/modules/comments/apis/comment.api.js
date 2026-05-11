import axios from "axios";
import config from "@/config/config";
import api from "./api.Index";


export const addReaction = async (data) => {
    const response = await api.post(`/comments/reaction`, data);
    return response.data.comment.reactions;
};

export const getReactionsById = async ( commentId ) => {
    const response = await axios.get(
        `${config.apiUrl}/comments/reactions/${commentId}`
    );
    return response.data.result.reactions;
};

export const getCommentById = async ({ postId }) => {
    const response = await axios.get(
        `${config.apiUrl}/comments/${postId}`
    );
    return response.data.result;
};

export const addComment = async (data) => {
    const response = await api.post(`/comments/add`, data);
    return response.data;
};

export const editComment = async (id, data) => {
    const response = await api.put(`/comments/edit/${id}`, data);
    return response.data;
};

export const deleteComment = async (id) => {
    const response = await api.delete(`/comments/delete/${id}`);
    return response.data;
};



