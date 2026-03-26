"use client";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FaTimes, FaSpinner } from "react-icons/fa";
import { updateOrder } from "@/apis/order.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/apis/order.api";

const OrderForm = (id) => {
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderById(id);
      setOrder(data.result)
    }
    fetchOrder();
  }, []);

  const state = useSelector((state) => state);
  // const order = state.auth.order?.data.data || state.auth.order?.data.loggedInOrder;

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (order) {
      reset({
        orderNumber: order.orderNumber ?? "",
        customerName: order.customerId ?? "",
        orderNumber: order.orderNumber ?? "",
        orderStatus: order.orderStatus ?? "",
        payment: order.payment ?? "",
        grandTotal: order.grandTotal ?? "",
        createdAt: order.createdAt ?? "",
      });
    }
  }, [order, reset]);


  const submitForm = (data) => {
    setLoading(true);
    updateOrder(order._id, {orderStatus: data?.orderStatus})
      .then((res) => {
        toast.success("order updated successfully");
        router.back();
      })
      .catch((error) => {
        toast.error("could not update order");
      })
      .finally(() => setLoading(false));

  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="w-full">
          <label
            htmlFor="orderNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order Name
          </label>
          <input
            disabled={order && true}
            type="text"
            id="orderNumber"
            className={`${order && 'disabled:text-gray-100/20'} bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary`}
            placeholder="Order Name"
            required
            {...register("orderNumber")}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="customerName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Customer Name
          </label>
          <input
            disabled={order && true}
            type="text"
            name="customerName"
            id="customerName"
            className={`${order && 'disabled:text-gray-100/20'} bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary`}
            placeholder="Customer Name"
            required
            {...register("customerName")}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="orderNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order Number
          </label>
          <input
            disabled={order && true}
            type="text"
            id="orderNumber"
            className={`${order && 'disabled:text-gray-100/20'} bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary`}
            placeholder="Rs.2999"
            min="0"
            required
            {...register("orderNumber")}
          />
        </div>
        <div>
          <label
            htmlFor="orderStatus"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order Status
          </label>
          <input
            type="text"
            id="orderStatus"
            className="bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary"
            placeholder="Paid, Pending, Delivered"
            required
            {...register("orderStatus")}
          />
        </div>
        <div>
          <label
            htmlFor="payment"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Payment
          </label>
          <input
            disabled={order && true}
            type="text"
            id="payment"
            className={`${order && 'disabled:text-gray-100/20'} bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary`}
            placeholder="false"
            {...register("payment")}
          />
        </div>
        <div>
          <label
            htmlFor="grandTotal"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Grand Total
          </label>
          <input
            disabled={order && true}
            type="text"
            id="grandTotal"
            className={`${order && 'disabled:text-gray-100/20'} bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary`}
            placeholder="Rs.10"
            {...register("grandTotal")}
          />
        </div>
        <div>
          <label
            htmlFor="createdAt"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Created At
          </label>
          <input
            disabled={order && true}
            type="text"
            id="createdAt"
            className={`${order && 'disabled:text-gray-100/20'} bg-[#07070729] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring focus:outline-none  dark:focus:ring-primary dark:focus:border-primary`}
            placeholder="1993/01/03"
            {...register("createdAt")}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="disabled:opacity-50 flex w-full items-center justify-center gap-2 cursor-pointer px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-primary hover:bg-primary"
      >
        {loading ? (
          <>
            {order && "Updating Order"}{" "}
            <FaSpinner className="animate-spin" />{" "}
          </>
        ) : (
          <> {order && "Update Order"}</>
        )}
      </button>
    </form>
  );
};

export default OrderForm;
