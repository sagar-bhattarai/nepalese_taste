"use client";
import Link from "next/link"
import { DASHBOARD_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import { useDispatch } from 'react-redux';
// import { logout } from "@/redux/auth/authSlice";
import { logOutUser } from "@/redux/auth/authActions";
import { FaSignOutAlt } from "react-icons/fa";

const User = ({ userEmail, setShow }) => {
    const dispatch = useDispatch();

    const dispatch_logout = () => {
        dispatch(logOutUser());
    }
    return (
        <div className="absolute right-0 top-11 p-4 z-10 bg-darkBackground border-gray-500 shadow rounded-md ">
            <p className="text-primary">{userEmail}</p>
            <hr className="my-1 text-primary"></hr>
            <div className={`flex flex-col`}>
                <Link onClick={() => setShow(false)} href={DASHBOARD_ROUTE} className="py-1 px-2 hover:bg-primary light:text-white">Dashboard</Link>
                <Link onClick={() => setShow(false)} href={PROFILE_ROUTE} className="py-1 px-2 hover:bg-primary light:text-white">profile</Link>
                <Link onClick={dispatch_logout} href="" className="flex items-center gap-2 py-1 px-2 dark:hover:text-black hover:bg-red-600 hover:text-white text-red-600">                         
                    <span className="">Logout</span><FaSignOutAlt />
                </Link>
            </div>
        </div>
    )
}

export default User

