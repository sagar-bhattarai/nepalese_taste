"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
import { CART_ROUTE } from "../constants/routes";
import { FaShoppingCart } from "react-icons/fa";



const CartTotal = () => {
    const state = useSelector((state) => state);
    const { products } = state.cart;

    return (
        <div className="relative">
            <Link href={CART_ROUTE}>
                <FaShoppingCart className="cursor-pointer hover:text-primary" />
                <span className="absolute right-[-10px] top-[-15px] w-4 h-4 text-gray-950 bg-amber-300 text-center rounded-full text-xs">{products.length}</span>
            </Link></div>
    )
}

export default CartTotal