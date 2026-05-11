"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import IncDecInput from "./IncDecInput.js";
import AddToCart from "../AddToCart.js";
import { useSelector } from "react-redux";
import AddToFavourites from "../AddToFavourites.js";


const ProductActions = ({ product }) => {
    const cartItem = useSelector((state) => state.cart.products);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const existing = cartItem?.find((p) => p._id === product._id);
        if (existing) {
            setQuantity(existing.quantity);
        }
    }, [cartItem, product._id]);

    return (
        <>
            <IncDecInput quantity={quantity} setQuantity={setQuantity} />
            <div className="mt-4 sm:gap-4 sm:items-center sm:flex sm:mt-4">
                <AddToFavourites product={product} type="button" />
                <AddToCart product={product} quantity={quantity} type="button" />
            </div>
        </>
    );
};

export default ProductActions;
