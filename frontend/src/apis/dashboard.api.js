import axios from "axios";
import config from "@/config/config";
// import api from "."
import api from "../apis/index.js"

export const customerSummary = async ()=>{
    const response = await api.get(`${config.apiUrl}/dashboard/customerSummary`);
    return response.data;
}

export const AdminSummary = async ()=>{
    const response = await api.get(`${config.apiUrl}/dashboard/adminSummary`);
    return response.data;
}

export const adminChartsData = async ()=>{
    const response = await api.get(`${config.apiUrl}/dashboard/chartsData`);
    return response.data;
}