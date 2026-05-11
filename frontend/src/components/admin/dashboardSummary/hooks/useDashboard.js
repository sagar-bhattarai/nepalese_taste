"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { adminChartsData } from "@/apis/dashboard.api";

export const useDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // const res = await axios.get("/api/admin/dashboard");
      const res = await adminChartsData();
      setData(res.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData(); // live refresh
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading };
};