"use client"
// import Link from "next/link";
import OrderBlock from "@/components/admin/orders/OrderBlock";
import Pagination from "@/components/admin/orders/Pagination";
import { fetchAllOrders } from "@/apis/order.api";
import { useState, useEffect } from "react";

const orderManagementPage = () => {
  const limit = 10;
  const [ordersData, setOrdersData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const loadOrdersData = async (reset = false) => {
    const res = await fetchAllOrders({ page, search });

    if (res) {
      if (reset) {
        setOrdersData(res);
      } else {
        setOrdersData((prev) => [...prev, ...res.data]);
      }
    }
  };

  useEffect(() => {
    setSearch("");
    loadOrdersData(true);
  }, [search, page]);


  return (
    <>
      <section className="">
        <div className=" mx-auto max-w-screen-2xl">
          <div className="relative overflow-hidde sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-purple-900">All orders: </span>
                  <span className="dark:text-white">{ordersData?.total || "N/A"}</span>
                </h5>
                <h5>
                  <span className="text-yellow-800">Total Pending: </span>
                  <span className="dark:text-white">{ordersData?.pendings || "N/A"}</span>
                </h5>
                <h5>
                  <span className="text-blue-800">Total Processing: </span>
                  <span className="dark:text-white">{ordersData?.processing || "N/A"}</span>
                </h5>
                <h5>
                  <span className="text-green-800">Total Delivered: </span>
                  <span className="dark:text-white">{ordersData?.delivered || "N/A"}</span>
                </h5>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <OrderBlock orders={ordersData?.orders} />
            </div>
            <Pagination page={page} setPage={setPage} overAllTotal={ordersData?.total} LIMIT={limit} />
          </div>
        </div>
      </section>
    </>
  )
}

export default orderManagementPage