"use client"
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cart/cartSlice";
import { addOrder } from "@/apis/order.api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CART_ROUTE } from "@/constants/routes";
import { CASH, CARD, VOUCHER, CRYPTO } from "@/constants/order";
import PayViaStripe from '../../../components/admin/orders/PayViaStripe';

const PaymentModelPage = () => {
  const router = useRouter();
  const state = useSelector((state) => state);
  const { products, finalPrice, deliveryPrice } = state.cart;
  // const { user } = state.auth;
  // const [requestedFrom, setRequestedFrom] = useState(null);
  // const dispatch = useDispatch();

  if ((products.length == 0) && (finalPrice <= 0)) {
    router.push(CART_ROUTE)
    return false;
  }

  // console.log(products)


  const payment = () => {
    // const orderItem = products.map((product) => ({
    //   productId: product._id,
    //   quantity: product.quantity,
    //   price: product.productPrice
    // }));

    // const shippingAddress = user.data.loggedInUser.userAddress;

    // const data = {
    //   orderItem,
    //   totalPrice: finalPrice,
    //   shippingAddress,
    //   requestedFrom,
    //   deliveryPrice
    // }

    // addOrder(data).then(() => {
    //   toast.success("Order created successfully", {
    //     onClose: () => {
    //       dispatch(clearCart())
    //       // router.push(CHECKOUT_ROUTE)
    //     }
    //   })
    // }).catch(error => {
    //   toast.error(error?.errors?.requestData);
    // });
  }

  // useEffect(() => {
  //   if (requestedFrom) { payment() }
  // }, [requestedFrom])


  return (
    <section className="py-10 relative">
      <div className="w-full max-w-5xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-3xl leading-8 text-black dark:text-gray-500 text-center"> Select Payment Method </h2>
        <p className="mt-2 font-normal text-xl leading-6 text-primary mb-8 text-center">Place Your Order</p>
        <div className="main-box border border-gray-200 dark:border-gray-700 rounded-xl max-w-xl max-lg:mx-auto lg:max-w-full">
          <div className="flex flex-col lg:flex-row lg:items-center  border-b border-gray-200">
              <PayViaStripe onClick={() => { setRequestedFrom(CARD) }} />
            {/* <div onClick={() => { setRequestedFrom(CARD) }} className="bg-amber-300  cursor-pointer hover:bg-amber-600 transition-all duration-300  py-4 text-center border rounded-tl-xl text-gray-900 w-full"><p className="font-semibold text-sm">Stripe Payment</p></div> */}
            <div onClick={() => { setRequestedFrom(CASH) }} className="bg-gray-300 cursor-pointer hover:bg-gray-600 py-4 transition-all duration-300 text-center border text-gray-900 w-full"><p className="font-semibold text-sm">Cash On Delivery</p></div>
            <div onClick={() => { setRequestedFrom(PAYPAL) }} className="bg-blue-300 cursor-pointer hover:bg-blue-600 py-4 transition-all duration-300 text-center border text-gray-900 w-full"><p className="font-semibold text-sm">Pay Via Paypal</p></div>
            <div onClick={() => { setRequestedFrom(CRYPTO) }} className="bg-cyan-300 cursor-pointer hover:bg-cyan-600 py-4 transition-all duration-300 text-center rounded-tr-xl  border text-gray-900 w-full"><p className="font-semibold text-sm">Pay Via Crypto Currency</p></div>
          </div>


          {products.map((product, index) => (
            <div key={index} className="w-full px-3 min-[400px]:px-6">
              <div className="flex flex-col lg:flex-row items-center py-2 gap-6 w-full">
                <div className="img-box max-lg:w-full">
                  <img src={product.productImage} alt="Premium Watch image"
                    className="aspect-square w-full lg:max-w-22 rounded-xl object-cover text-gray-500 text-xs" />
                </div>
                <div className="flex flex-row items-center w-full ">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">

                    <div className="flex items-center justify-center">
                      <div className="">
                        <h2 className="font-semibold text-lg leading-6 text-black dark:text-gray-500 ">
                          {product.productName}</h2>
                        <p className="font-normal text-base leading-5 text-gray-500  ">
                          {product.productDescription}</p>
                        <div className="flex items-center ">
                          <p className="font-medium text-sm leading-5 text-black dark:text-gray-600">Qty: <span
                            className="text-gray-500">{product.quantity}</span></p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5">
                      <div className="col-span-5 lg:col-span-2 flex items-center justify-center max-lg:mt-3">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm leading-7 text-black dark:text-gray-600">price</p>
                          <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">Rs. {product.productPrice}</p>
                        </div>
                      </div>

                      <div className="col-span-5 lg:col-span-3 flex items-center justify-center max-lg:mt-3 ">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm leading-7 text-black dark:text-gray-600">Category
                          </p>
                          <p className="font-medium text-xs text-center leading-6 whitespace-nowrap py-0.5 px-3 border border-emerald-600 rounded-full lg:mt-3 bg-emerald-100 text-emerald-600">
                            {product.categoryName}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {((index + 1) != products.length) ? <hr className="border border-gray-200 dark:border-gray-700 my-1 mx-6"></hr> : ''}
            </div>
          ))}




          <div className="w-full border-t border-gray-200 dark:border-gray-700 pr-6 flex flex-col lg:flex-row items-center justify-between ">
            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
              <button
                className="flex outline-0 py-4 sm:pr-6 cursor-pointer pl-6 border rounded-bl-xl sm:border-r  border-gray-200 dark:border-gray-700 bg-red-400 hover:bg-red-500 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-xs text-black transition-all duration-500 ">
                <svg className="stroke-black transition-all duration-300  " xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22 22"
                  fill="none">
                  <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" strokeWidth="1.6"
                    strokeLinecap="round" />
                </svg>
                Cancel Order
              </button>
            </div>
            <p className="font-medium text-base text-black  dark:text-gray-600">Total Price: <span className="text-indigo-600"> Rs. {finalPrice}</span></p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PaymentModelPage