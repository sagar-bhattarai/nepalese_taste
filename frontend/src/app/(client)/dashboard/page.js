"use client"
import Link from "next/link";
import SwiperCarousel from "@/components/SwiperCarousel";
import { useEffect, useState } from "react";
import { fetchAllFavourites, deleteFavourite } from "@/apis/favourite.api";
import { customerSummary } from "@/apis/dashboard.api";
import { addOrder } from "@/apis/order.api";
import productPlaceHolder from "../../../../public/product_placeholder.jpg"
import IncDecInput from "@/components/products/inputAction/IncDecInput";
import { useRouter, useSearchParams } from "next/navigation";
import { ORDER_MANAGEMENT_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import { useSelector } from "react-redux";
import Pagination from "@/components/products/Pagination";
import SortBy from "@/components/products/Filters/SortBy";
import ByCategories from "@/components/products/Filters/ByCategories";
import Loading from "../../../components/Loader";


const Dashboard = () => {
  const limit = 3;
  const [favourites, setFavourites] = useState({
    products: [],
    total: 0,
  });

  // console.log(favourites.products )

  const [dashboardData, setDashboardData] = useState();
  const [quantities, setQuantities] = useState({})
  const [deliveryType, setDeliveryTypes] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(limit);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.auth?.user?.userData);

  const DEFAULT_SORT = JSON.stringify({ createdAt: -1 });
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();

    // keep only what you want
    if (size) params.set("size", size);

    if (sort) {
      params.set("sort", sort);
    }

    if (category) {
      params.set("category", category);
    }

    params.set("page", 1);

    router.push(`?${params.toString()}`);
  }, [sort, category]);


  const handleSortChange = (value) => {
    const params = new URLSearchParams();

    params.set("sort", value);
    if (category) params.set("category", category);

    params.set("page", 1);

    router.push(`?${params.toString()}`);
  };


  const handleCategoryChange = (value) => {
    const params = new URLSearchParams();

    params.set("category", value);
    if (sort) params.set("sort", sort);

    params.set("page", 1);

    router.push(`?${params.toString()}`);
  };

  const loadFavourites = async () => {
    if (loading) return;
    setLoading(true);

    const params = Object.fromEntries(searchParams.entries());

    const response = await fetchAllFavourites({ ...params, page, size, });
    setFavourites({ products: response.products, total: response.total });

    setLoading(false);
  };

  const customerDashboardData = async () => {
    const response = await customerSummary();
    setDashboardData(response.summary);
  };

  useEffect(() => {
    customerDashboardData();
  }, []);

  useEffect(() => {
    loadFavourites();
  }, [page, searchParams, size]);


  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleDeliveryChange = (productId, value) => {
    setDeliveryTypes(prev => ({
      ...prev,
      [productId]: Number(value),
    }));
  };

  const buyHandler = async (item) => {
    const order = {
      deliveryPrice: Number(deliveryType[item?._id] || 0),
      orderItem: [
        {
          price: Number(item.product.productPrice * Number(quantities[item?._id] || 1)),
          productId: item.product._id,
          quantity: Number(quantities[item?._id] || 1)
        }
      ],
      shippingAddress: item.customerId.userAddress,
      totalPrice: Number(item.product.productPrice * Number(quantities[item?._id] || 1))
    }

    const orderAdded = await addOrder(order);

    if (orderAdded?.order?.success) {
      router.push(ORDER_MANAGEMENT_ROUTE)
    }
  }

  const removeHandler = async (id) => {
    await deleteFavourite(id);
    loadFavourites();
  }


  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">


        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/*  Metric Group One */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {/*  Metric Item Start  */}
            <div className="rounded-2xl border border-gray-200 bg-gray-100/40 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800">
                <svg
                  className="fill-gray-800 dark:fill-white/90"
                  width="24"
                  height="24"
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

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.userName}
                  </span>
                  <h4 className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {/* contact: */}
                    {user.userPhone || "N/A  9876543210"}
                  </h4>
                </div>

                <Link href={PROFILE_ROUTE} className="cursor-pointer ">
                  <span className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary">
                    View
                  </span>
                </Link>
              </div>
            </div>
            {/*  Metric Item End  */}

            {/*  Metric Item Start  */}
            <div className="rounded-2xl border border-gray-200 bg-gray-100/40 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100/50 dark:bg-gray-800">
                <svg
                  className="fill-gray-800 dark:fill-white/90"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z"
                    fill=""
                  ></path>
                </svg>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Total Orders
                  </span>
                  <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
                    {dashboardData?.order?.totalOrders}
                  </h4>
                </div>

                <span className="flex items-center gap-1 rounded-full bg-error-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">
                  Rs. {dashboardData?.order?.confirmed?.totalRevenue}
                </span>
              </div>
            </div>
            {/*  Metric Item End */}
          </div>
          {/* Metric Group One */}

          {/*  ====== Chart One Start */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100/40 px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                My Monthly Orders
              </h3>

              <div x-data="{openDropDown: false}" className="relative h-fit">
                <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
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
                  className="absolute right-0 z-40 w-40 p-2 space-y-1 bg-white border border-gray-200 shadow-theme-lg dark:bg-gray-dark top-full rounded-2xl dark:border-gray-800"
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

            <div className="max-w-full overflow-x-auto custom-scrollbar">
              chart 1.        see this page https://demo.tailadmin.com/
            </div>
          </div>
          {/* ====== Chart One End */}
        </div>


        <div className="col-span-12 xl:col-span-5">
          {/* ====== Chart Two Start */}
          <div className="">
            <div className="shadow-default border-transparent  rounded-tr-xl rounded-tl-xl bg-gray-100/40 p-5 dark:bg-gray-900 sm:px-6 sm:pt-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Specially For You !!!
                  </h3>
                  <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
                    With Huge Discount, voucher-max & free-shipping.
                  </p>
                </div>
                <div x-data="{openDropDown: false}" className="relative h-fit">
                  <button className="text-gray-400 hover:text-gray-700 dark:hover:text-white">
                    <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z" fill=""></path>
                    </svg>
                  </button>
                  <div className="absolute right-0 top-full z-40 w-40 space-y-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark" style={{ "display": "none" }}>
                    <button className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                      View More
                    </button>
                    <button className="flex w-full rounded-lg px-3 py-2 text-left text-theme-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative h-auto border- border-slate-500- rounded-md- mt-2">
                <SwiperCarousel products={dashboardData?.products } itemsToShow={(dashboardData?.products.length >= 3) ? 3 : 1} height={100} size={"small"} />
              </div>
              <p className="mx-auto mt-1.5 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
                choose a product to be & feel lucky.
              </p>
            </div>

            <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5  border-transparent rounded-br-xl rounded-bl-xl  bg-gray-400  ">
              <div>
                <p className="mb-1  text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                  Voucher's
                </p>
                <Link href="#" className="cursor-pointer ">
                  <p className="flex items-center justify-center gap-1 hover:text-primary text-theme-xs text-center  text-gray-500 dark:text-gray-200 sm:text-sm ">
                    Get Here
                  </p>
                </Link>
              </div>

              <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>

              <div>
                <p className="mb-1  text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                  Discount's
                </p>
                <Link href="#" className="cursor-pointer ">
                  <p className="flex items-center justify-center gap-1  hover:text-primary text-theme-xs text-center  text-gray-500 dark:text-gray-200 sm:text-sm ">
                    Upto 25%
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z" fill="#039855"></path>
                    </svg>
                  </p>
                </Link>

              </div>

              <div className="h-7 w-px bg-gray-200 dark:bg-gray-800"></div>
              <div>
                <p className="mb-1  text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                  Free Shipping
                </p>
                <Link href="#" className="cursor-pointer">
                  <p className="flex items-center justify-center gap-1 text-theme-xs text-center  hover:text-primary  text-gray-500 dark:text-gray-200 sm:text-sm ">
                    View All
                  </p>
                </Link>
              </div>
            </div>
          </div>
          {/* ====== Chart Two End */}
        </div>


        {/* Favourite Products */}
        <div className="col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100/40 px-4 pt-4 pb-3 sm:px-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex justify-between w-max gap-2">
                <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {favourites?.total}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  Favourite Products
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg className="stroke-current fill-white dark:fill-gray-800" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.29004 5.90393H17.7067" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M17.7075 14.0961H2.29085" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="" stroke="" strokeWidth="1.5"></path>
                    <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="" stroke="" strokeWidth="1.5"></path>
                  </svg>
                  Sort
                  <SortBy
                    setSort={handleSortChange}
                    ItemName={"Favourites"}
                    classes={"text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"} />
                </button>


                <button className="text-theme-sm shadow-theme-xs inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-100/50 pl-4  font-medium text-gray-700  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg className="stroke-current fill-white dark:fill-gray-800" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.29004 5.90393H17.7067" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M17.7075 14.0961H2.29085" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" fill="" stroke="" strokeWidth="1.5"></path>
                    <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" fill="" stroke="" strokeWidth="1.5"></path>
                  </svg>
                  Filter
                  <ByCategories
                    setCategory={handleCategoryChange}
                    classes={"text-gray-900 text-sm cursor-pointer block w-full p-2 dark:hover:text-gray-500 bg-[#07070729]  dark:text-gray-600 outline-none border-none"} />
                </button>
              </div>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar ">

              {
                loading 
                  ?
                  <Loading/>
                  :
                  favourites?.products?.map((item) => (
                    <div key={item._id} className="mb-4 main-box border dark:border-gray-700 border-gray-200 rounded-xl ">
                      <div className="w-full px-3 min-[400px]:px-6">
                        <div className="flex flex-col lg:flex-row items-center py-3  gap-6 w-full">
                          <div className="img-box max-lg:w-full">
                            <img src={item.product.productImage || productPlaceHolder.src} alt="Premium Watch image"
                              className="aspect-square w-full lg:max-w-18 rounded-xl object-cover text-gray-500 text-xs" />
                          </div>
                          <div className="flex flex-row items-center w-full ">
                            <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
                              <div className="col-span-3 ">
                                <h2 className="font-semibold text-base leading-5 text-black dark:text-gray-500 ">
                                  {item.product.productName}</h2>
                                <p className="font-normal text-xs leading-5 text-cyan-700 ">
                                  {item.category.categoryName}</p>
                                <p className="font-normal text-base leading-5 text-gray-500">
                                  {item.product.productDescription}</p>
                              </div>

                              <div className="grid col-span-8">
                                <div className="flex gap-4 lg:gap-8">
                                  <div className=" flex items-center m-auto">
                                    <div className="flex gap-3 lg:block">
                                      <p className="font-medium text-sm leading-7 text-black dark:text-gray-600">Price</p>
                                      <p className=" font-medium text-sm leading-7 text-indigo-600">Rs. {item.product.productPrice}</p>
                                    </div>
                                  </div>

                                  <div className=" flex items-center flex-col m-auto">
                                    <p className="font-medium text-sm leading-7 text-black dark:text-gray-600">
                                      Quantity</p>
                                    <div className="mt-auto pt-2">
                                      <IncDecInput
                                        key={item._id}
                                        quantity={quantities[item._id] || 1}
                                        setQuantity={(val) => handleQuantityChange(item._id, val)}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex items-center flex-col m-auto">
                                    <p className="font-medium text-sm leading-7 text-black dark:text-gray-600 ">Delivery Type:</p>
                                    <select
                                      className=" p-1 w-max text-sm border cursor-pointer dark:text-gray-600 light:text-black dark:border-gray-600 light:border-gray-300 rounded-md"
                                      name="delivery_type"
                                      id="delivery_type"
                                      value={deliveryType[item._id] ?? 0}
                                      onChange={(e) => handleDeliveryChange(item._id, e.target.value)}>
                                      <option value={0}>Free Delivery</option>
                                      <option value={15}>DHL Fast Delivery</option>
                                      <option value={49}> Express Delivery</option>
                                    </select>
                                  </div>

                                  <div className=" flex items-center m-auto">
                                    <div className="flex gap-3 lg:block">
                                      <p className="font-medium text-sm  whitespace-nowrap leading-7 text-black dark:text-gray-600">
                                        Expected Delivery Time</p>
                                      <p className={`
                                  ${(deliveryType[item._id] == 0 || !deliveryType[item._id]) && "text-orange-500"}
                                  ${(deliveryType[item._id] == 15) && "text-amber-300"}
                                  ${(deliveryType[item._id] == 49) && "text-emerald-500"}
                                  font-medium text-sm whitespace-nowrap leading-7  text-center`}>
                                        {(deliveryType[item._id] == 0 || !deliveryType[item._id]) && "with in 3 days"}
                                        {(deliveryType[item._id] == 15) && "with in 2 days"}
                                        {(deliveryType[item._id] == 49) && "with in a day"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => buyHandler(item)}
                              className="transition-all duration-500  bg-green-100 text-green-600 hover:text-gray-200 hover:bg-green-700 border border-green-600 cursor-pointer  text-xs text-success-600 dark:bg-success-500/15 dark:text-success-500 rounded-full px-4 py-1 font-medium">
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>


                      <div className="w-full border-t dark:border-gray-700 border-gray-200 pr-6 flex flex-col lg:flex-row items-center justify-between ">
                        <button
                          onClick={() => removeHandler(item._id)}
                          className="flex py-2 pl-6 sm:pr-6 cursor-pointer  border rounded-bl-xl sm:border-r border-red-300 dark:border-red-900 text-red-500 hover:text-white  hover:bg-red-500 whitespace-nowrap gap-2 items-center justify-center font-medium group text-xs transition-all duration-500 ">
                          <svg className="stroke-red-700 hover:stroke-white transition-all duration-300  " xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22 22"
                            fill="">
                            <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" strokeWidth="1.6"
                              strokeLinecap="round" />
                          </svg>
                          Remove
                        </button>
                        <p className="font-medium text-base text-black dark:text-gray-600 ml-2">Total Price <span className="text-[10px]">(Tax inc) </span>: <span className="text-indigo-600">Rs. {(quantities[item._id] * item.product.productPrice) || item.product.productPrice} </span></p>
                      </div>

                    </div>
                  ))
              }

            </div>
          </div>
          {/* pagination */}
          <Pagination page={page} setPage={setPage} LIMIT={size} overAllTotal={favourites?.total} />
        </div>

      </div>
    </>
  );
};

export default Dashboard;
