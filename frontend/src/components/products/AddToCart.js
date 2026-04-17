
"use client"
import { addToCart } from "@/redux/cart/cartSlice";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddToCart = ({ product, quantity, type = "circle" }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // dispatch(addToCart(product));
        dispatch(addToCart({ ...product, quantity }));
        toast.success(product.productName + "added to cart");
    }
    return (
        <div>
            {type == "button"
                ?
                <button
                    onClick={handleAddToCart}
                    type="button"
                    className="transition duration-300 inline-flex items-center text-primary dark:hover:text-black hover:text-white border border-primary cursor-pointer hover:bg-primary box-border borderfocus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none">
                    <MdOutlineAddShoppingCart className="w-4 h-4 mr-2" /> Add to cart
                </button>
                :
                <button
                    onClick={handleAddToCart}
                    type="button"
                    className="transition duration-300 inline-flex items-center text-primary dark:hover:text-black hover:text-white border border-primary cursor-pointer hover:bg-primary box-border borderfocus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-full text-sm px-2 py-2 focus:outline-none">
                    <MdOutlineAddShoppingCart className="w-4 h-4" />
                </button>
            }
        </div>
    )
}

export default AddToCart