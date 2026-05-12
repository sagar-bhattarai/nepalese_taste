"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { adminSidebarLinks, normalSidebarLinks } from "@/constants/sidebarLinks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const user = useSelector((state) => state.auth?.user?.userData);
    const [sidebarlinks, setSideBarLinks] = useState();
    const path = usePathname();
    const pathname = path.startsWith("/") ? path.slice(1) : path;

    useEffect(() => {
        if (user?.userRoles[0] == "ADMIN") {
            setSideBarLinks(adminSidebarLinks)
        } else {
            setSideBarLinks(normalSidebarLinks)
        }
    })

    return (
        <>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base ms-3 mt-3 text-sm p-2 focus:outline-none inline-flex sm:hidden">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
                </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-34 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto  border-e border-slate-600">
                    <Link href="/" className="flex items-center ps-2.5 mb-5">
                        <Image
                            src={logo}
                            className="md:w-5 w-5"
                            height={50}
                            width={50}
                            alt="Shopping Logo"
                        />
                        <span className="self-center text-lg text-heading text-primary font-semibold whitespace-nowrap ml-2">e-Shop</span>
                    </Link >
                    <ul className="space-y-2 font-medium">
                        {sidebarlinks?.map((item) => (
                            <li key={item.route} className={`${pathname == item.label.toLowerCase() ? "bg-primary text-slate-400" : "text-gray-600 dark:hover:bg-gray-100/5 hover:bg-gray-100/20"} `}>
                                <Link href={item.route} className="flex items-center px-2 py-1.5">
                                    <item.Icon />
                                    <span className={`${pathname == item.label.toLowerCase() ? "bg-primary text-slate-400" : "text-gray-600"} ms-3`}>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar