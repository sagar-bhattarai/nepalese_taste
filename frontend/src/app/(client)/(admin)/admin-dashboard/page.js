"use client";
import { AdminSummary } from "@/apis/dashboard.api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ORDER_MANAGEMENT_ROUTE, PRODUCTS_ROUTE, USER_MANAGEMENT_ROUTE } from "../../../../constants/routes";
import productPlaceHolder from "../../../../../public/product_placeholder.jpg"
import StatCard from "@/components/admin/dashboardSummary/card/StatCard";
import { useDashboard } from "@/components/admin/dashboardSummary/hooks/useDashboard";
import RevenueChart from "@/components/admin/dashboardSummary/charts/RevenueChart";
import Loading from "@/components/Loader";
import TopProductsChart from "@/components/admin/dashboardSummary/charts/TopProductsChart";
import { GoPackage } from "react-icons/go";
import { TbPackages } from "react-icons/tb";
import { LuPackageOpen, LuPackagePlus, LuPackageSearch } from "react-icons/lu";

const AdminDashboard = () => {
  const [summaries, setSummaries] = useState();
  const { data, loading } = useDashboard();

  const fethAdminSummary = async () => {
    const response = await AdminSummary();
    setSummaries(response.summary);
  };

  useEffect(() => {
    fethAdminSummary();
  }, []);



  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/*  Metric Group One */}
          <div className="flex justify-between items-center gap-2 sm:gap-4">
            {/*  Metric Item Start  */}
            <div className="rounded-2xl w-full hover:shadow border border-gray-200 bg-gray-100/40  p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
              <Link href={USER_MANAGEMENT_ROUTE}>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800">
                  <svg
                    className="fill-gray-800 dark:fill-white/90"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.80443 5.60156C7.59109 5.60156 6.60749 6.58517 6.60749 7.79851C6.60749 9.01185 7.59109 9.99545 8.80443 9.99545C10.0178 9.99545 11.0014 9.01185 11.0014 7.79851C11.0014 6.58517 10.0178 5.60156 8.80443 5.60156ZM5.10749 7.79851C5.10749 5.75674 6.76267 4.10156 8.80443 4.10156C10.8462 4.10156 12.5014 5.75674 12.5014 7.79851C12.5014 9.84027 10.8462 11.4955 8.80443 11.4955C6.76267 11.4955 5.10749 9.84027 5.10749 7.79851ZM4.86252 15.3208C4.08769 16.0881 3.70377 17.0608 3.51705 17.8611C3.48384 18.0034 3.5211 18.1175 3.60712 18.2112C3.70161 18.3141 3.86659 18.3987 4.07591 18.3987H13.4249C13.6343 18.3987 13.7992 18.3141 13.8937 18.2112C13.9797 18.1175 14.017 18.0034 13.9838 17.8611C13.7971 17.0608 13.4132 16.0881 12.6383 15.3208C11.8821 14.572 10.6899 13.955 8.75042 13.955C6.81096 13.955 5.61877 14.572 4.86252 15.3208ZM3.8071 14.2549C4.87163 13.2009 6.45602 12.455 8.75042 12.455C11.0448 12.455 12.6292 13.2009 13.6937 14.2549C14.7397 15.2906 15.2207 16.5607 15.4446 17.5202C15.7658 18.8971 14.6071 19.8987 13.4249 19.8987H4.07591C2.89369 19.8987 1.73504 18.8971 2.05628 17.5202C2.28015 16.5607 2.76117 15.2906 3.8071 14.2549ZM15.3042 11.4955C14.4702 11.4955 13.7006 11.2193 13.0821 10.7533C13.3742 10.3314 13.6054 9.86419 13.7632 9.36432C14.1597 9.75463 14.7039 9.99545 15.3042 9.99545C16.5176 9.99545 17.5012 9.01185 17.5012 7.79851C17.5012 6.58517 16.5176 5.60156 15.3042 5.60156C14.7039 5.60156 14.1597 5.84239 13.7632 6.23271C13.6054 5.73284 13.3741 5.26561 13.082 4.84371C13.7006 4.37777 14.4702 4.10156 15.3042 4.10156C17.346 4.10156 19.0012 5.75674 19.0012 7.79851C19.0012 9.84027 17.346 11.4955 15.3042 11.4955ZM19.9248 19.8987H16.3901C16.7014 19.4736 16.9159 18.969 16.9827 18.3987H19.9248C20.1341 18.3987 20.2991 18.3141 20.3936 18.2112C20.4796 18.1175 20.5169 18.0034 20.4837 17.861C20.2969 17.0607 19.913 16.088 19.1382 15.3208C18.4047 14.5945 17.261 13.9921 15.4231 13.9566C15.2232 13.6945 14.9995 13.437 14.7491 13.1891C14.5144 12.9566 14.262 12.7384 13.9916 12.5362C14.3853 12.4831 14.8044 12.4549 15.2503 12.4549C17.5447 12.4549 19.1291 13.2008 20.1936 14.2549C21.2395 15.2906 21.7206 16.5607 21.9444 17.5202C22.2657 18.8971 21.107 19.8987 19.9248 19.8987Z"
                      fill=""
                    ></path>
                  </svg>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Customers
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <h4 className="text-title-sm font-bold text-gray-800 dark:text-slate-400">
                    {summaries?.totalUsers}
                  </h4>
                  <span className="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                    <svg
                      className="fill-current"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.56462 1.62393C5.70193 1.47072 5.90135 1.37432 6.12329 1.37432C6.1236 1.37432 6.12391 1.37432 6.12422 1.37432C6.31631 1.37415 6.50845 1.44731 6.65505 1.59381L9.65514 4.5918C9.94814 4.88459 9.94831 5.35947 9.65552 5.65246C9.36273 5.94546 8.88785 5.94562 8.59486 5.65283L6.87329 3.93247L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93578L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65248C2.3017 5.35949 2.30185 4.88462 2.59484 4.59182L5.56462 1.62393Z"
                        fill=""
                      ></path>
                    </svg>
                    11.01%
                  </span>
                </div>
              </Link>
            </div>
            {/*  Metric Item End  */}

            {/*  Metric Product Item Start  */}
            <div className="rounded-2xl w-full hover:shadow-md border border-gray-200 bg-gray-100/40  p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
              <Link href={PRODUCTS_ROUTE}>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800">
                  <GoPackage />
                </div>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Products
                </p>
                <div className=" flex items-end justify-between">
                  <h4 className="text-title-sm font-bold text-gray-800 dark:text-slate-400">
                    {summaries?.totalProducts}
                  </h4>

                  <span className="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
                    <svg
                      className="fill-current"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.56462 1.62393C5.70193 1.47072 5.90135 1.37432 6.12329 1.37432C6.1236 1.37432 6.12391 1.37432 6.12422 1.37432C6.31631 1.37415 6.50845 1.44731 6.65505 1.59381L9.65514 4.5918C9.94814 4.88459 9.94831 5.35947 9.65552 5.65246C9.36273 5.94546 8.88785 5.94562 8.59486 5.65283L6.87329 3.93247L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93578L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65248C2.3017 5.35949 2.30185 4.88462 2.59484 4.59182L5.56462 1.62393Z"
                        fill=""
                      ></path>
                    </svg>
                    11.01%
                  </span>
                </div>
              </Link>
            </div>
            {/*  Metric Product Item End  */}

            {/*  Metric Order Item Start  */}
            <div className="rounded-2xl w-full hover:shadow-md border border-gray-200 bg-gray-100/40  p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
              <Link href={ORDER_MANAGEMENT_ROUTE}>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800">
                  <TbPackages/>
                </div>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Orders
                </p>
                <div className=" flex items-end justify-between">
                  <h4 className="text-title-sm font-bold text-gray-800 dark:text-slate-400">
                    {summaries?.totalOrders}
                  </h4>

                  <span className="flex items-center gap-1 rounded-full bg-error-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">
                    <svg
                      className="fill-current"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z"
                        fill=""
                      ></path>
                    </svg>
                    9.05%
                  </span>
                </div>
              </Link>
            </div>
            {/*  Metric Order Item End */}

            {/*  Metric out of Stock Item Start  */}
            <div className="rounded-2xl w-full hover:shadow-md border border-gray-200 bg-gray-100/40  p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
              <Link href={PRODUCTS_ROUTE}>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800">
                  <LuPackageOpen/>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 w-full mt-1">
                  Out Of Stock
                </p>
                <div className="mt-0 flex items-end justify-between">
                  <h4 className=" text-title-sm font-bold text-gray-800 dark:text-slate-400">
                    {summaries?.outOfStock}
                  </h4>

                  <span className={`${Number(summaries?.outOfStockPercentage) > 0 ? "text-red-600 " : "text-blue-600"} flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium  dark:bg-error-500/15 dark:text-error-500`}>
                    {summaries?.outOfStockPercentage}%
                  </span>
                </div>
              </Link>
            </div>
            {/*  Metric out of Stock Item End */}

            {/*  Metric Low Stock Item Start  */}
            <div className="rounded-2xl hover:shadow-md w-full border border-gray-200 bg-gray-100/40    p-2 dark:border-gray-800 dark:bg-white/[0.03] md:p-3">
              <Link href={PRODUCTS_ROUTE}>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800">
                  {/* <LuPackagePlus/>  */}
                  <LuPackageSearch/> 
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 w-full mt-1">
                  Low In Stock
                </p>
                <div className="mt-0 flex items-end justify-between">
                  <h4 className=" text-title-sm font-bold text-gray-800 dark:text-slate-400">
                    {summaries?.lowStockCount}
                  </h4>

                  <span className={`${Number(summaries?.lowStockPercentage) > 0 ? "text-red-600 " : "text-blue-600"} flex items-center gap-1 rounded-full py-0.5 pl-2 pr-2.5 text-sm font-medium dark:bg-error-500/15 dark:text-error-500`}>
                    {summaries?.lowStockPercentage}%
                  </span>
                </div>
              </Link>
            </div>
            {/*  Metric Low Stock Item End */}
          </div>
          {/* Metric Group One */}

          {/* KPI CARDS */}
          <div className="flex gap-2">
            <StatCard title="Today Orders" value={summaries?.today?.orders} />
            <StatCard title="Today Revenue" value={"Rs." + summaries?.today?.revenue} />
            <StatCard title="Total Fulfilled" value={summaries?.total?.orders} />
            <StatCard title="Total Revenue" value={"Rs." + summaries?.total?.revenue} />
          </div>

          {/*  ====== Top Selling Products Chart Start */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100/40  p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-400">
                Top Selling Products
              </h3>

              <div x-data="{openDropDown: false}" className="relative h-fit">
                <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                      fill=""
                    ></path>
                  </svg>
                </button>
                <div
                  className="absolute right-0 z-40 w-40 p-2 space-y-1 bg-gray-100/40  border border-gray-200 shadow-theme-lg dark:bg-gray-dark top-full rounded-2xl dark:border-gray-800"
                  style={{ display: "none" }}
                >
                  <button className="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    View More
                  </button>
                  <button className="flex w-full px-3 py-2 font-medium text-left text-gray-500 rounded-lg text-theme-xs hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-full rounded-xl pt-2">
              {/* chart 1. see this page https://demo.tailadmin.com/ */}

              {loading
                ?
                <div className="flex flex-col justify-center items-center h-full p-2 bg-slate-400 dark:bg-slate-600 rounded-xl">
                  <Loading />
                  <p className="text-xs text-gray-200 dark:text-slate-500">Fetching Top Products Chart  Details...</p>
                </div>
                :
                <TopProductsChart data={data?.topSellingProducts || []} />}
            </div>
          </div>
          {/* ====== Top Selling Products Chart End */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {/* ======  Monthly Revenue Chart Start */}
          <div className="rounded-xl border border-gray-200 bg-gray-100/400 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="shadow-default rounded-xl bg-gray-100/40  px-5 pb-5 pt-5 dark:bg-gray-900 sm:px-6 sm:pt-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-400">
                    Monthly Revenue
                  </h3>
                  <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
                    Target you’ve set for each month
                  </p>
                </div>
                <div x-data="{openDropDown: false}" className="relative h-fit">
                  <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                        fill=""
                      ></path>
                    </svg>
                  </button>
                  <div
                    className="absolute right-0 top-full z-40 w-40 space-y-1 rounded-xl border border-gray-200 bg-gray-100/40  p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                    style={{ display: "none" }}
                  >
                    <button className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                      View More
                    </button>
                    <button className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className=" max-h-56 h-40 my-5 rounded-xl">
                {loading
                  ?
                  <div className="flex flex-col justify-center items-center h-full p-2 bg-slate-400 dark:bg-slate-600 rounded-xl">
                    <Loading />
                    <p className="text-xs text-gray-200 dark:text-slate-500">Fetching Monthly Revenue Details...</p>
                  </div>
                  :
                  <RevenueChart data={data?.monthlyStats || []} />}
              </div>
              <p className="mx-auto  w-full max-w-[380px] text-center text-xs text-gray-500 sm:text-base">
                You earn $3287 today, it's higher than last month. Keep up your
                good work!
              </p>
            </div>

            <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
              <div>
                <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Target
                </p>
                <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-slate-400 sm:text-lg">
                  $20K
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.26816 13.6632C7.4056 13.8192 7.60686 13.9176 7.8311 13.9176C7.83148 13.9176 7.83187 13.9176 7.83226 13.9176C8.02445 13.9178 8.21671 13.8447 8.36339 13.6981L12.3635 9.70076C12.6565 9.40797 12.6567 8.9331 12.3639 8.6401C12.0711 8.34711 11.5962 8.34694 11.3032 8.63973L8.5811 11.36L8.5811 2.5C8.5811 2.08579 8.24531 1.75 7.8311 1.75C7.41688 1.75 7.0811 2.08579 7.0811 2.5L7.0811 11.3556L4.36354 8.63975C4.07055 8.34695 3.59568 8.3471 3.30288 8.64009C3.01008 8.93307 3.01023 9.40794 3.30321 9.70075L7.26816 13.6632Z"
                      fill="#D92D20"
                    ></path>
                  </svg>
                </p>
              </div>

              <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>

              <div>
                <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Revenue
                </p>
                <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-slate-400 sm:text-lg">
                  $20K
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                      fill="#039855"
                    ></path>
                  </svg>
                </p>
              </div>

              <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>

              <div>
                <p className="mb-1 text-center text-theme-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                  Today
                </p>
                <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-slate-400 sm:text-lg">
                  $20K
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z"
                      fill="#039855"
                    ></path>
                  </svg>
                </p>
              </div>
            </div>
          </div>
          {/* ======  Monthly Revenue Chart End */}
        </div>

        <div className="col-span-12 xl:col-span-5">
          {/* ====== Map One Start */}
          <div className="rounded-2xl border border-gray-200 bg-gray-100/40  p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-400">
                  Customers Demographic
                </h3>
                <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
                  Number of customer based on country
                </p>
              </div>

              <div x-data="{openDropDown: false}" className="relative h-fit">
                <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                      fill=""
                    ></path>
                  </svg>
                </button>
                <div
                  className="absolute right-0 top-full z-40 w-40 space-y-1 rounded-2xl border border-gray-200 bg-gray-100/40  p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                  style={{ display: "none" }}
                >
                  <button className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    View More
                  </button>
                  <button className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="border-gary-200 my-6 overflow-hidden rounded-2xl border bg-gray-100/40 px-4 py-6 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
              map. see this page https://demo.tailadmin.com/
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-full max-w-8 items-center rounded-full">
                    <img src="src/images/country/country-01.svg" alt="usa" />
                  </div>
                  <div>
                    <p className="text-theme-sm font-semibold text-gray-800 dark:text-slate-400">
                      USA
                    </p>
                    <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                      2,379 Customers
                    </span>
                  </div>
                </div>

                <div className="flex w-full max-w-[140px] items-center gap-3">
                  <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                    <div className="absolute left-0 top-0 flex h-full w-[79%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
                  </div>
                  <p className="text-theme-sm font-medium text-gray-800 dark:text-slate-400">
                    79%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-full max-w-8 items-center rounded-full">
                    <img src="src/images/country/country-02.svg" alt="france" />
                  </div>
                  <div>
                    <p className="text-theme-sm font-semibold text-gray-800 dark:text-slate-400">
                      France
                    </p>
                    <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                      589 Customers
                    </span>
                  </div>
                </div>

                <div className="flex w-full max-w-[140px] items-center gap-3">
                  <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                    <div className="absolute left-0 top-0 flex h-full w-[23%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"></div>
                  </div>
                  <p className="text-theme-sm font-medium text-gray-800 dark:text-slate-400">
                    23%
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ====== Map One End */}
        </div>

        <div className="col-span-12 xl:col-span-7 ">
          <div className="overflow-hidden h-full rounded-2xl border border-gray-200 bg-gray-100/40  px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">

            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-400">
                  Recent Orders
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-gray-300 bg-gray-100/40  px-4 py-1.5 text-sm  text-gray-700 hover:bg-gray-100/40 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                  <Link className="cursor-pointer w-max text-wrap block" href={ORDER_MANAGEMENT_ROUTE} >
                    See all
                  </Link>
                </div>

              </div>
            </div>

            <hr className="border-slate-600 mb-1"></hr>

            <div className="max-w-full overflow-x-auto custom-scrollbar  w-full">
              {summaries?.orderToday.length
                ?
                summaries?.orderToday.map((item) => (
                  <div key={item._id} className="flex w-full mb-2  my-1 main-box border dark:border-gray-700 border-gray-200 rounded-xl ">
                    <div className="w-full px-2">
                      <div className="flex flex-col lg:flex-row items-center py-1  gap-6 w-full">
                        <div className="img-box max-lg:w-full">
                          <img src={item.product.productImage || productPlaceHolder.src} alt="Premium Watch image"
                            className="aspect-square w-8 rounded-md object-cover text-gray-500 text-xs" />
                        </div>
                        <div className="flex flex-row items-center justify-between w-full ">
                          <div className="">
                            <h2 className="font-semibold text-xs leading-3 text-black dark:text-gray-500 ">
                              {item.product.productName}</h2>
                            <p className="font-normal text-xs leading-3 text-cyan-700 ">
                              {item.category.categoryName}</p>
                          </div>

                          <div className=" flex items-center m-auto">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-xs leading-3 text-black dark:text-gray-600">Status</p>
                              <p className=" font-medium text-xs leading-3 text-indigo-600">{item.orderStatus}</p>
                            </div>
                          </div>


                          <div className=" flex items-center m-auto">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-xs leading-3  whitespace-nowrap text-black dark:text-gray-600">
                                Delivery Time</p>
                              <p className={`
                                  ${(item.deliveryType == "FREE_DELIVERY" || !item.deliveryType) && "text-orange-500"}
                                  ${(item.deliveryType == "FAST_DELIVERY") && "text-amber-300"}
                                  ${(item.deliveryType == "EXPRESS_DELIVERY") && "text-emerald-500"}
                                  font-medium text-xs leading-3 whitespace-nowrap   text-center`}>
                                {(item.deliveryType == 'FREE_DELIVERY' || !item.deliveryType) && "with in 3 days"}
                                {(item.deliveryType == "FAST_DELIVERY") && "with in 2 days"}
                                {(item.deliveryType == "EXPRESS_DELIVERY") && "with in a day"}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end">
                            <p className="font-medium text-xs leading-3 text-black dark:text-gray-600 ml-2">Total:</p>
                            <p className="text-primary text-xs leading-3">Rs.{item.totalPrice} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                ))
                :
                <div className="p-2 rounded-md bg-gray-100/40 text-red-900 text-center w-full">
                  "No any orders for today"
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
