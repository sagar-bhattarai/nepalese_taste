"use client";
import { useRouter } from "next/navigation";
import { PAYMENT_ROUTE, PRODUCTS_ROUTE, CART_ROUTE, ORDER_MANAGEMENT_ROUTE } from "@/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, removeFromCart, increaseQuantity, addDeliveryPrice, clearCart } from "../../../redux/cart/cartSlice";
import { useState, useRef, useEffect } from "react";
import { fetchAllRecommendations } from "@/apis/recommendation.api";
import recommendationLogic from "../../../helper/recommendationLogic";
import { useForm } from "react-hook-form";
import { shippingDetails } from "../../../redux/cart/cartSlice";
import { addOrder } from "@/apis/order.api";
import { toast } from "react-toastify";


const PaymentPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { products, totalCount, finalPrice } = state.cart;
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const isClicked = useRef(false);
    const [recommendedProducts, setRecommendedProducts] = useState();
    const { register, handleSubmit, reset } = useForm();

    const { user } = state.auth;
    const authUser = user?.data?.loggedInUser;
    useEffect(() => {
        if (authUser?.userName) {
            reset({
                first_name: authUser.first_name || "",
                last_name: authUser.last_name || "",
                email: authUser.userEmail || "",
                country: authUser.country || "",
                phone: authUser.phone || "",
                city: authUser.city || "",
                street_address: authUser.street_address || "",
                street_address_1: authUser.street_address_1 || "",
            });
        }
    }, [authUser, reset]);


    if ((products?.length == 0) && (finalPrice <= 0)) {
        // router.push(CART_ROUTE)
        // return false;
    }

    // const proceedToPayment = () => {
    //     if (isClicked.current) return; // block second click to prevent multiple delivery charge
    //     isClicked.current = true;

    //     dispatch(addDeliveryPrice(deliveryCharge));
    //     router.push(PAYMENT_ROUTE);
    // };

    const deliveryChargeHandle = (price) => {
        setDeliveryCharge(price);
    };

    const remove = (product) => {
        if (confirm("Are you sure?")) {
            dispatch(removeFromCart(product))
            if (totalCount == 1) {
                dispatch(clearCart())
                router.push(PRODUCTS_ROUTE);
            }
        }
    }

    useEffect(() => {
        const rec = async () => {
            const data = recommendationLogic(products);
            const result = await fetchAllRecommendations(data);
            setRecommendedProducts(result)
        }
        rec()
    }, []);

    const submitForm = (data) => {
        dispatch(shippingDetails(data));


        const orderItem = products.map((product) => ({
            productId: product._id,
            quantity: product.quantity,
            price: product.productPrice
        }));

        const orderData = {
            orderItem,
            totalPrice: finalPrice,
            shippingAddress: data.city +" "+ data.street_address +" "+ data.street_address_1  ,
            deliveryPrice: deliveryCharge
        }

        addOrder(orderData).then(() => {
            toast.success("Order created successfully", {
                onClose: () => {
                    // dispatch(addDeliveryPrice(deliveryCharge));
                    // router.push(PAYMENT_ROUTE);
                }
            })
            router.push(ORDER_MANAGEMENT_ROUTE);
            dispatch(clearCart())
        }).catch(error => {
            toast.error(error?.errors?.requestData);
        });

    }
    return (
        <section className=" py-8 antialiased dark:bg-gray-900 md:py-12">
            <form onSubmit={handleSubmit(submitForm)} action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
                    <li className="after:border-0.5 flex items-center text-primary after:mx-6 after:hidden after:h-0.5 after:w-full after:border-b after:border-primary dark:text-primary dark:after:border-primary sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                            <svg
                                className="me-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            Cart
                        </span>
                    </li>

                    <li className="after:border-0.5 flex items-center text-primary after:mx-6 after:hidden after:h-0.5 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                            <svg
                                className="me-2 h-4 w-4 sm:h-5 sm:w-5 text-primary"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            Checkout
                        </span>
                    </li>

                    <li className="flex shrink-0 items-center">
                        <svg
                            className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        Order summary
                    </li>
                </ol>

                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Delivery Details    --- remaining inputs --- register user
                            </h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="first_name"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {" "}
                                        Your first name{" "}
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        {...register("firstName")}
                                        className="block w-full rounded-lg border border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder="Bonnie "
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="last_name"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {" "}
                                        Your last name*{" "}
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        {...register("lastName")}
                                        className="block w-full rounded-lg border border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder="Green"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label
                                            htmlFor="country"
                                            className="block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            Country*{" "}
                                        </label>
                                    </div>
                                    <input
                                        type="country"
                                        id="country"
                                        {...register("country")}
                                        className="block w-full rounded-lg border border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder="United Kingdom"
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {" "}
                                            City*{" "}
                                        </label>
                                    </div>
                                    <select
                                        {...register("city", { required: "Select City" })}
                                        id="city"
                                        className="block w-full rounded-lg border border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    >
                                        <option value="">-- Select City --</option>
                                        {/* <option defaultValue="">San Francisco</option> */}
                                        <option value="SF">San Francisco</option>
                                        <option value="NY">New York</option>
                                        <option value="LA">Los Angeles</option>
                                        <option value="CH">Chicago</option>
                                        <option value="HU">Houston</option>

                                        {/* {city?.map((city) => (
                                            <option key={city._id} value={city._id}>{city.cityName}</option>
                                        ))} */}

                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {" "}
                                        Phone Number*{" "}
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            id="phone"
                                            // data-dropdown-toggle="phone"
                                            className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-gray-300 bg-[#ffffff38] px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-[#ffffff38]0 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                            type="button"
                                        >
                                            <svg
                                                fill="none"
                                                aria-hidden="true"
                                                className="me-2 h-4 w-4"
                                                viewBox="0 0 20 15"
                                            >
                                                <rect
                                                    width="19.6"
                                                    height="14"
                                                    y=".5"
                                                    fill="#fff"
                                                    rx="2"
                                                />
                                                <g mask="url(#a)">
                                                    <path
                                                        fill="#D02F44"
                                                        fillRule="evenodd"
                                                        d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                                        clipRule="evenodd"
                                                    />
                                                    <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
                                                    <g filter="url(#filter0_d_343_121520)">
                                                        <path
                                                            fill="url(#paint0_linear_343_121520)"
                                                            fillRule="evenodd"
                                                            d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                            +1
                                            {/* <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                            </svg> */}
                                        </button>

                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                id="phone"
                                                {...register("phone")}

                                                className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:border-s-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500"
                                                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                placeholder="123-456-7890"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {" "}
                                        Email{" "}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email")}

                                        className="block w-full rounded-lg border border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder="name@flowbite.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="vat_number"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >Street Address
                                    </label>
                                    <input
                                        type="text"
                                        id="street_address"
                                        {...register("street_address")}
                                        className="block w-full rounded-lg border border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder="ram janaki tole"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="vat_number"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >Street Address 1
                                    </label>
                                    <input
                                        type="text"
                                        id="street_address_1"
                                        {...register("street_address_1")}
                                        className="block w-full rounded-lg border border-gray-300 bg-[#ffffff38] p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder="ram janaki tole"
                                    />
                                </div>

                                {/* <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200  px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-[#ffffff38] hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 12h14m-7 7V5"
                                            />
                                        </svg>
                                        Add new address
                                    </button>
                                </div> */}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Delivery Methods
                            </h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                                <div className="rounded-lg border border-gray-200 bg-[#ffffff38] p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input
                                                id="fedex"
                                                aria-describedby="fedex-text"
                                                type="radio"
                                                name="delivery-method"
                                                value=""
                                                className="cursor-pointer h-4 w-4 border-gray-300  text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                onChange={() => deliveryChargeHandle(0)}
                                                checked={(deliveryCharge == 0) && true}
                                            />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label
                                                htmlFor="fedex"
                                                className="cursor-pointer font-medium leading-none text-gray-900 dark:text-white"
                                            >
                                                {" "}
                                                Free Delivery - FedEx{" "}
                                            </label>
                                            <p
                                                id="fedex-text"
                                                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                                            >
                                                Get it by Friday, 13 Dec 2023
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-[#ffffff38] p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input
                                                id="dhl"
                                                aria-describedby="dhl-text"
                                                type="radio"
                                                name="delivery-method"
                                                value=""
                                                className="cursor-pointer h-4 w-4 border-gray-300  text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                onChange={() => deliveryChargeHandle(15)}
                                                checked={(deliveryCharge == 15) && true}
                                            />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label
                                                htmlFor="dhl"
                                                className="cursor-pointer font-medium leading-none text-gray-900 dark:text-white"
                                            >
                                                {" "}
                                                Rs. 15 - DHL Fast Delivery{" "}
                                            </label>
                                            <p
                                                id="dhl-text"
                                                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                                            >
                                                Get it by Tommorow
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg border border-gray-200 bg-[#ffffff38] p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input
                                                id="express"
                                                aria-describedby="express-text"
                                                type="radio"
                                                name="delivery-method"
                                                value=""
                                                className="cursor-pointer h-4 w-4 border-gray-300  text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                                onChange={() => deliveryChargeHandle(49)}
                                                checked={(deliveryCharge == 49) && true}
                                            />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label
                                                htmlFor="express"
                                                className="cursor-pointer font-medium leading-none text-gray-900 dark:text-white"
                                            >
                                                {" "}
                                                Rs. 49 - Express Delivery{" "}
                                            </label>
                                            <p
                                                id="express-text"
                                                className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                                            >
                                                Get it today
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                        <div className="flow-root">
                            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        Subtotal
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                        Rs. {finalPrice}
                                    </dd>
                                </dl>
                                {/* 
                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        Savings
                                    </dt>
                                    <dd className="text-base font-medium text-green-500">0</dd>
                                </dl> */}

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        Store Pickup
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                        {(deliveryCharge == 0) ? "Free Delivery" : `Rs. ${deliveryCharge}`}
                                    </dd>
                                </dl>

                                {/* <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                        Tax
                                    </dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                                        Rs. 199
                                    </dd>
                                </dl> */}

                                <dl className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                                        Total
                                    </dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                                        Rs. {finalPrice + deliveryCharge}
                                    </dd>
                                </dl>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                // onClick={proceedToPayment}
                                type="submit"
                                className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-800 hover:bg-primary  text-white rounded-md cursor-pointer"
                            >
                                Proceed to Payment
                            </button>
                        </div>

                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                            <div className="min-w-0 flex-1 space-y-4">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        People Also Buy
                                    </h2>
                                </div>

                                <div className="space-y-6">
                                    {recommendedProducts?.slice(0, 3).map((product) => (
                                        <div key={product._id} className="flex gap-2 bg-[#ffffff38] dark:bg-[#2e2e2e4a] px-2 py-2 rounded-md shadow-sm border border-gray-200 dark:border-[#e5e7eb2e]">
                                            <div className="flex gap-4 sm:gap-2 max-sm:flex-col">
                                                <div className="w-12 h-12 max-sm:w-8 max-sm:h-8 shrink-0">
                                                    <img src='https://readymadeui.com/images/watch1.webp' className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="ml-1">
                                                        <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-500">{product.productName}</h3>
                                                        <p className="text-[12px] font-medium text-slate-500 flex items-center gap-2">Color: <span className="inline-block w-2 h-2 rounded-sm bg-[#ac7f48]"></span></p>
                                                    </div>
                                                    <div className="ml-1">
                                                        <h3 className="text-[10px] font-semibold text-slate-900 dark:text-slate-500">Rs. {product?.productPrice * product?.quantity}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-auto flex flex-col ">
                                                <div className="flex items-center gap-4 justify-end">
                                                    <button className="text-[10px] cursor-pointer hover:text-primary">Add to Cart</button>

                                                    <button onClick={() => remove(product)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block" viewBox="0 0 24 24">
                                                            <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                                            <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                                                        </svg>
                                                    </button>

                                                </div>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button type="button"
                                                        onClick={() => dispatch(increaseQuantity(product))}
                                                        className="flex items-center justify-center w-4 h-4 cursor-pointer bg-slate-400 hover:bg-primary outline-none rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-1.5 fill-white" viewBox="0 0 42 42">
                                                            <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                                        </svg>
                                                    </button>
                                                    <span className="font-semibold text-xs  text-slate-600 dark:text-slate-200">{product.quantity}</span>
                                                    <button type="button"
                                                        disabled={product.quantity == 1}
                                                        onClick={() => dispatch(decreaseQuantity(product))}
                                                        className="disabled:bg-slate-800 disabled:text-gray-200 flex items-center justify-center  w-4 h-4 cursor-pointer bg-slate-800 hover:bg-primary outline-none rounded-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-1.5 fill-white" viewBox="0 0 124 124">
                                                            <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </section>
    );
};

export default PaymentPage;
