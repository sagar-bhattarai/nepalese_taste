
"use client"
import { addToCart } from "@/redux/cart/cartSlice";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";

const AddToCart = ({product}) => {
    const dispatch = useDispatch();

    const addProductToCart = () => {
        dispatch(addToCart(product));
    }
    return (
        <div>
            <button onClick={addProductToCart} type="button" className="transition duration-300 inline-flex items-center text-primary dark:hover:text-black hover:text-white border border-primary cursor-pointer hover:bg-primary box-border borderfocus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-2 py-2 focus:outline-none">
                {/* <button type="button" className="transition duration-300 hover:bg-[#101828] inline-flex items-center  dark:text-black dark:hover:text-primary  bg-brand cursor-pointer bg-primary box-border border dark:hover:border-primary dark:border-black border-gray-200 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-2 py-2 focus:outline-none"> */}
                {/* <svg className="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" /></svg> */}
                <MdOutlineAddShoppingCart className="w-4 h-4" />
            </button>
        </div>
    )
}

export default AddToCart