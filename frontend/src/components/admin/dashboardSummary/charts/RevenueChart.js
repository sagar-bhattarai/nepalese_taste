"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <div className="bg-gray-100/50 dark:bg-gray-800 p-4 rounded-xl shadow-md h-full">
      {/* <h2 className="mb-2 font-semibold">Monthly Revenue</h2> */}

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#6366F1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;