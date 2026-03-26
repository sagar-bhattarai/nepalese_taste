"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import Sidebar from "@/components/admin/Sidebar";

const AdminLayout = ({ children }) => {
    const { user } = useSelector(state => state.auth);
    const router = useRouter()

    useEffect(() => {
        if (!user) router.push(LOGIN_ROUTE)
    }, [user])

    if (!user) {
        return <div className="mt-24"><FaSpinner className="animate" /></div>
    }
    return (
        <div className="">{children}</div>
    )
}

export default AdminLayout