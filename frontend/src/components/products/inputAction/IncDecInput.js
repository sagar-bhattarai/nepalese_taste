"use client"

const IncDecInput = ({ quantity, setQuantity }) => {
    const increaseQuantityHandle = () => {
        if(quantity == 10) return false
        setQuantity(quantity+1)
    };

    const decreaseQuantityHandle = () => {
        if(quantity == 1) return false
        setQuantity(quantity-1)
    };


    return (
        <div className="flex items-center gap-3 mt-auto">
            <button type="button"
                onClick={increaseQuantityHandle}
                className="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-400 hover:bg-primary outline-none rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 42 42">
                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                </svg>
            </button>
            <span className="font-semibold text-base leading-[18px] text-slate-600 dark:text-slate-200">
                {quantity}
            </span>
            <button type="button"
                disabled={quantity === 1}
                onClick={decreaseQuantityHandle}
                className="disabled:bg-gray-100 disabled:text-gray-200 flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-800 hover:bg-primary outline-none rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 124 124">
                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                </svg>
            </button>
        </div>
    )
}

export default IncDecInput