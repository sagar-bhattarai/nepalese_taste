import {
    DASHBOARD_ROUTE,
    PRODUCT_MANAGEMENT_ROUTE,
    USER_MANAGEMENT_ROUTE,
    ORDER_MANAGEMENT_ROUTE,
    CATEGORY_MANAGEMENT_ROUTE,
    MEDIA_MANAGEMENT_ROUTE,
    SETTING_MANAGEMENT_ROUTE
} from "./routes";
import {
    FaChartPie,
    FaShoppingBag,
    FaShoppingCart,
    FaUsersCog
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";
import { TbSettingsStar } from "react-icons/tb"


const adminSidebarLinks = [
    {
        Icon: FaChartPie,
        label: "Dashboard",
        route: DASHBOARD_ROUTE
    },
    {
        Icon: BiSolidCategoryAlt,
        label: "Categories",
        route: CATEGORY_MANAGEMENT_ROUTE
    },
    {
        Icon: FaShoppingBag,
        label: "Products",
        route: PRODUCT_MANAGEMENT_ROUTE
    },
    {
        Icon: FaUsersCog,
        label: "Users",
        route: USER_MANAGEMENT_ROUTE
    },
    {
        Icon: FaShoppingCart,
        label: "Orders",
        route: ORDER_MANAGEMENT_ROUTE
    },
    {
        Icon: MdPermMedia,
        label: "Media",
        route: MEDIA_MANAGEMENT_ROUTE
    },
    {
        Icon: TbSettingsStar,
        label: "Settings",
        route: SETTING_MANAGEMENT_ROUTE
    },
]

const normalSidebarLinks = [
    {
        Icon: FaChartPie,
        label: "Dashboard",
        route: DASHBOARD_ROUTE
    },
    {
        Icon: FaShoppingCart,
        label: "Orders",
        route: ORDER_MANAGEMENT_ROUTE
    }, 
    {
        Icon: TbSettingsStar,
        label: "Settings",
        route: SETTING_MANAGEMENT_ROUTE
    },

]

export { adminSidebarLinks, normalSidebarLinks };