import {
    ORDER___PENDING,
    ORDER___PAID,
    ORDER___CONFIRMED,
    ORDER___DELIVERED,
    ORDER___SHIPPED,

    CASH___ORDER___PENDING,
    ALL___ORDER___PENDING,
    ALL___ORDER___PAID,
    ALL___ORDER___CONFIRMED,
    ALL___ORDER___DELIVERED,
    ALL___ORDER___SHIPPED,

    ORDER___FREE___DELIVERY,
    ORDER___FAST___DELIVERY,
    ORDER___EXPRESS___DELIVERY
} from "@/constants/order";
import { SiTicktick } from "react-icons/si";
import PayViaStripe from "./PayViaStripe.js"
import { payViaCash } from "@/apis/order.api";
import { toast } from "react-toastify";

const OrderBlock = ({ orders }) => {

    const cashPayment = async (id)=>{
        const result = await payViaCash(id);
        if(result){
            toast.success("payment successfull.");
        }
    }

    return (
        <section className="md:py-5 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

                {orders?.map((orderItems, index) => (
                    <div key={index} className="mb-8 main-box border dark:border-gray-700 border-gray-200 rounded-xl  max-w-xl max-lg:mx-auto lg:max-w-full">
                        <div
                            className="flex flex-col lg:flex-row lg:items-center justify-between px-6 py-3 border-b dark:border-gray-700 border-gray-200">
                            <div className="data">
                                <p className="font-semibold text-xs leading-5 text-black dark:text-gray-500 ">Order Id: <span className="text-indigo-600 font-medium">{orderItems._id}</span></p>
                                <p className="font-semibold text-xs leading-5 text-black dark:text-gray-500 ">TrackingId Id: <span className="text-indigo-600 font-medium">{orderItems.trackingId}</span></p>
                                {/* {orderItems.orderStatus !== ALL___ORDER___PENDING
                                    ? <p className="font-semibold text-xs leading-5 text-black dark:text-gray-500 ">Order Payment : <span className="text-gray-400 font-medium"> use payment date</span></p> 
                                    : <p className="font-semibold text-xs leading-5 text-black dark:text-gray-500 ">Order Created : <span className="text-gray-400 font-medium">{orderItems.createdAt}</span></p>
                                } */}
                                <p className="font-semibold text-xs leading-5 text-black dark:text-gray-500 ">
                                    Order Created :
                                    <span className="font-medium text-emerald-500">
                                        {" "}
                                        {new Date(orderItems.createdAt)
                                            .toLocaleString(
                                                "en-IN",
                                                {
                                                    timeZone: "Asia/Kathmandu",
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )
                                        }
                                    </span>
                                </p>

                            </div>
                            <button
                                className="rounded-full py-2 px-7 font-semibold text-xs leading-5 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Track
                                Your Order</button>
                        </div>


                        {orderItems?.items?.map((item, index) => (
                            <div key={index} className="w-full px-3 min-[400px]:px-6">
                                <div className="flex flex-row-reverse md:flex-row md:items-center py-3 gap-2 md:gap-6 w-full">
                                    <div className="img-box h-max lg:w-full">
                                        <img src={item.productImage} alt="Premium Watch image"
                                            className="aspect-square w-full md:max-w-24 rounded-xl object-cover text-gray-500 text-xs" />
                                    </div>
                                    <div className="flex flex-row items-center w-full ">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                                            <div className="flex items-center">
                                                <div className="">
                                                    <h2 className="font-semibold text-base leading-7 text-black dark:text-gray-500 ">
                                                        {item.productName}</h2>
                                                    <p className="font-normal text-base leading-5 text-gray-500 ">
                                                        {item.productDescription}</p>
                                                    <div className="flex items-center ">
                                                        <p className="font-medium text-base leading-7 text-black dark:text-gray-600">Qty: <span
                                                            className="text-gray-500"> {item.quantity}</span></p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="grid grid-cols-5">
                                                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black dark:text-gray-600">price</p>
                                                        <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">Rs. {item.price}</p>
                                                    </div>
                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm leading-7 text-black dark:text-gray-600">Status</p>
                                                        <p className={`
                                                             ${item.itemOrderStatus == ORDER___PENDING && "text-red-600 bg-red-100 border-red-500"}
                                                             ${item.itemOrderStatus == ORDER___PAID && "text-yellow-600 bg-yellow-100 border-yellow-500"}
                                                             ${item.itemOrderStatus == ORDER___CONFIRMED && "text-blue-600 bg-blue-100 border-blue-500"}
                                                             ${item.itemOrderStatus == ORDER___SHIPPED && "text-purple-600 bg-purple-100 border-purple-500"}
                                                             ${item.itemOrderStatus == ORDER___DELIVERED && "text-emerald-600 bg-emerald-100 border-emerald-500"}
                                                            font-medium text-sm text-center leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 border `}>
                                                            {item.itemOrderStatus == ORDER___PENDING && "Pending"}
                                                            {item.itemOrderStatus == ORDER___PAID && "In Process"}
                                                            {item.itemOrderStatus == ORDER___CONFIRMED && "Ready For Delivery"}
                                                            {item.itemOrderStatus == ORDER___SHIPPED && "On The Way"}
                                                            {item.itemOrderStatus == ORDER___DELIVERED && "Delivered"}
                                                        </p>
                                                    </div>

                                                </div>
                                                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                                    <div className="flex gap-3 lg:block">
                                                        <p className="font-medium text-sm  whitespace-nowrap leading-7 text-black dark:text-gray-600">
                                                            Expected Delivery Time</p>
                                                        <p className={`
                                                            ${orderItems.deliveryType == ORDER___FREE___DELIVERY && "text-orange-500"}
                                                            ${orderItems.deliveryType == ORDER___FAST___DELIVERY && "text-amber-300"}
                                                            ${orderItems.deliveryType == ORDER___EXPRESS___DELIVERY && "text-emerald-500"}
                                                            font-medium text-sm whitespace-nowrap leading-7 lg:mt-3 text-center`}>
                                                            {orderItems.deliveryType == ORDER___FREE___DELIVERY && "with in 3 days"}
                                                            {orderItems.deliveryType == ORDER___FAST___DELIVERY && "with in 2 days"}
                                                            {orderItems.deliveryType == ORDER___EXPRESS___DELIVERY && "with in a day"}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                {((index) < orders.length) ? <hr className="border dark:border-gray-700 border-gray-200 my-1 mx-6"></hr> : ''}
                            </div>
                        ))}


                        <div className="w-full border-t dark:border-gray-700 border-gray-200 md:pr-6 flex flex-col lg:flex-row items-center justify-between ">
                            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">

                                {(orderItems.orderStatus == ALL___ORDER___PENDING)
                                    ?
                                    <>
                                        <button
                                            className="w-full md:w-auto flex outline-0 py-4 sm:pr-6 cursor-pointer pl-6 border md:rounded-bl-xl sm:border-r dark:border-gray-700 border-gray-200 bg-red-400 hover:bg-red-500 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-xs text-black transition-all duration-500 ">
                                            <svg className="stroke-black transition-all duration-300  " xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22 22"
                                                fill="none">
                                                <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" strokeWidth="1.6"
                                                    strokeLinecap="round" />
                                            </svg>
                                            Cancel Order
                                        </button>
                                        <div className="w-full md:w-auto">
                                            <div className="flex flex-col lg:flex-row lg:items-center  dark:border-gray-700 border-b border-gray-200">
                                                {/* <PayViaStripe/> */}
                                                <PayViaStripe id={orderItems._id} />
                                                {/* <div onClick={() => { "(CARD)" }} className="bg-amber-300  cursor-pointer hover:bg-amber-600 transition-all duration-300  py-4 text-center border  text-gray-900 w-full"><p className="font-semibold text-xs  whitespace-nowrap px-4" >Stripe Payment</p></div> */}
                                                <div onClick={() => cashPayment(orderItems._id) } className="bg-gray-300 cursor-pointer hover:bg-gray-600 py-4 transition-all duration-300 text-center  text-gray-900 w-full"><p className="font-semibold text-xs  whitespace-nowrap px-4">Cash On Delivery</p></div>
                                                <div onClick={() => { "(PAYPAL)" }} className="bg-blue-300 cursor-pointer hover:bg-blue-600  py-4 transition-all duration-300 text-center  text-gray-900 w-full"><p className="font-semibold text-xs  whitespace-nowrap px-4">Pay Via Paypal</p></div>
                                                <div onClick={() => { "(CRYPTO)" }} className="bg-cyan-300 cursor-pointer hover:bg-cyan-600 py-4 transition-all duration-300 text-center  text-gray-900 w-full"><p className="font-semibold text-xs  whitespace-nowrap px-4">Pay Via Crypto Currency</p></div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {orderItems.orderStatus == ALL___ORDER___CONFIRMED && <p className="font-medium text-base py-4  pl-6  max-lg:text-center text-primary flex items-center gap-2"><SiTicktick className="text-emerald-500" /> Paid Using Credit Card <span className="text-gray-500">ending with 8822</span></p>}
                                        {orderItems.orderStatus == CASH___ORDER___PENDING && <p className="font-medium text-base py-4  pl-6  max-lg:text-center text-primary flex items-center gap-2"><SiTicktick className="text-emerald-500" /> Cash On Delivery </p>}
                                    </>
                                }
                            </div>
                            <p className="font-medium text-base text-black dark:text-gray-600 py-2 md:py-0 md:ml-2">Total Price <span className="text-[10px]">(Tax inc) </span>: <span className="text-indigo-600">Rs.{orderItems.totalPrice}</span></p>
                        </div>

                    </div>
                ))}

            </div>
        </section>
    );
};

export default OrderBlock;










// <section className="py-5 relative">
//     <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
//         <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
//             <div
//                 className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
//                 <div className="data">
//                     <p className="font-semibold text-base leading-7 text-black">Order Id: <span className="text-indigo-600 font-medium">#10234987</span></p>
//                     <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium"> 18th march
//                         2021</span></p>
//                 </div>
//                 <button
//                     className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Track
//                     Your Order</button>
//             </div>
//             <div className="w-full px-3 min-[400px]:px-6">
//                 <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
//                     <div className="img-box max-lg:w-full">
//                         <img src="https://pagedone.io/asset/uploads/1701167607.png" alt="Premium Watch image"
//                             className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"/>
//                     </div>
//                     <div className="flex flex-row items-center w-full ">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
//                             <div className="flex items-center">
//                                 <div className="">
//                                     <h2 className="font-semibold text-xl leading-8 text-black mb-3">
//                                         Premium Quality Dust Watch</h2>
//                                     <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
//                                         By: Dust Studios</p>
//                                     <div className="flex items-center ">
//                                         <p
//                                             className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
//                                             Size: <span className="text-gray-500">100 ml</span></p>
//                                         <p className="font-medium text-base leading-7 text-black ">Qty: <span
//                                             className="text-gray-500">2</span></p>
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className="grid grid-cols-5">
//                                 <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
//                                     <div className="flex gap-3 lg:block">
//                                         <p className="font-medium text-sm leading-7 text-black">price</p>
//                                         <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">$100</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
//                                     <div className="flex gap-3 lg:block">
//                                         <p className="font-medium text-sm leading-7 text-black">Status
//                                         </p>
//                                         <p
//                                             className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
//                                             Ready for Delivery</p>
//                                     </div>

//                                 </div>
//                                 <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
//                                     <div className="flex gap-3 lg:block">
//                                         <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
//                                             Expected Delivery Time</p>
//                                         <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
//                                             23rd March 2021</p>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>


//                     </div>
//                 </div>

//                 <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
//                     <div className="img-box max-lg:w-full">
//                         <img src="https://pagedone.io/asset/uploads/1701167621.png" alt="Diamond Watch image"
//                             className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"/>
//                     </div>
//                     <div className="flex flex-row items-center w-full ">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
//                             <div className="flex items-center">
//                                 <div className="">
//                                     <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
//                                         Diamond Platinum Watch</h2>
//                                     <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
//                                         Diamond Dials</p>
//                                     <div className="flex items-center  ">
//                                         <p
//                                             className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
//                                             Size: <span className="text-gray-500">Regular</span></p>
//                                         <p className="font-medium text-base leading-7 text-black ">Qty: <span
//                                             className="text-gray-500">1</span></p>
//                                     </div>
//                                 </div>

//                             </div>
//                             <div className="grid grid-cols-5">
//                                 <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
//                                     <div className="flex gap-3 lg:block">
//                                         <p className="font-medium text-sm leading-7 text-black">price</p>
//                                         <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">$100</p>
//                                     </div>
//                                 </div>
//                                 <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
//                                     <div className="flex gap-3 lg:block">
//                                         <p className="font-medium text-sm leading-7 text-black">Status
//                                         </p>
//                                         <p
//                                             className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
//                                             Dispatched</p>
//                                     </div>

//                                 </div>
//                                 <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
//                                     <div className="flex gap-3 lg:block">
//                                         <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
//                                             Expected Delivery Time</p>
//                                         <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
//                                             23rd March 2021</p>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>


//                     </div>
//                 </div>

//             </div>
//             <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
//                 <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
//                     <button
//                         className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
//                         <svg className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
//                             fill="none">
//                             <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" strokeWidth="1.6"
//                                 strokeLinecap="round" />
//                         </svg>
//                         Cancel Order
//                     </button>
//                     <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Paid using Credit Card <span className="text-gray-500">ending with 8822</span></p>
//                 </div>
//                 <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600"> $200.00</span></p>
//             </div>

//         </div>
//     </div>
// </section>