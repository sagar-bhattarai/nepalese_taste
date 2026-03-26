"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = (props) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <input
                required
                autoComplete="current-password"
                className="dark:text-gray-600 light:text-dark block w-full rounded-md border dark:border-gray light:border-gray-300 bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500 sm:text-sm/6"
                type={show ? "text" : "password"}
                {...props}
            />
            <button
                className="absolute top-2.5 right-2.5 cursor-pointer"
                type="button"
                onClick={() => setShow(!show)}
            >
                {show ? <FaEye className="text-gray-400"/> : <FaEyeSlash className="text-gray-600"/>}
            </button>
        </div>
    );
};

export default PasswordInput;
