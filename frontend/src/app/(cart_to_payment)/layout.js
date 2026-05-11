"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CART_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";


const CartCheckoutPayment = ({ children }) => {
    const { products, finalPrice } = useSelector((state) => state.cart);
    const router = useRouter()

    useEffect(() => {
        if ((products.length == 0) && (finalPrice <= 0)) router.push(CART_ROUTE)
    }, [])


    return (<>{children}</> )
}

export default CartCheckoutPayment