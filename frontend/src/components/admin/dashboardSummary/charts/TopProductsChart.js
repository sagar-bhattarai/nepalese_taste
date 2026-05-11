"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import productPlaceHolder from "../../../../../public/product_placeholder.jpg"

const TopProductsChart = ({ data }) => {
  const theme = useSelector((state) => state.userPreferences.theme);
  const router = useRouter();

  const handleBarClick = (data) => {
    if (!data?._id) return;
    router.push(`/products/${data._id}`);
  };

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-3 border border-slate-600 w-48 max-w-48">

          {/* Image */}
          <img
            src={(data.productImage) ? data.productImage : productPlaceHolder.src}
            alt={data.productName}
            className="w-full h-24 object-cover rounded-md mb-2"
          />

          {/* Name */}
          <p className="font-semibold text-sm truncate">
            {data.productName}
          </p>

          {/* Price */}
          <p className="text-xs text-gray-500">
            Rs {data.productPrice}
          </p>

          {/* Sold */}
          <p className="text-xs text-green-600">
            Sold: {data.totalSold}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-gray-100/50 dark:bg-gray-900 p-4 rounded-xl shadow-md">

      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data}>
          <XAxis dataKey="productName" />
          <YAxis />
          {/* <Tooltip
            offset={20}  // pushes tooltip away from cursor
            wrapperStyle={{ zIndex: 1000 }}
            wrapperStyle={{ top: 0 }}
            cursor={false}
            contentStyle={{
              backgroundColor: "#111",
              border: "none",
              borderRadius: "8px",
              color: "#fff"
            }} /> */}
          <Tooltip
            offset={65}
            position={{ y: -60 }}
            content={<CustomTooltip />}
            cursor={false} />
          {/* <Bar dataKey="totalSold" /> */}
          {/* <Bar dataKey="totalSold" fill={theme != "light" ? "#22C55E" : "#4F46E5"} /> */}

          {theme == "light"
            ?
            <>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <Bar
                onClick={(data) => handleBarClick(data)}
                dataKey="totalSold"
                fill="url(#colorGradient)"
                cursor="pointer"
                activeBar={{ fill: "#8200db" }}
              />
            </>
            :
            <>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <Bar
                onClick={(data) => handleBarClick(data)}
                dataKey="totalSold"
                fill="url(#colorGradient)"
                cursor="pointer"
                activeBar={{ fill: "#8200db" }}
              />
            </>
          }
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProductsChart;