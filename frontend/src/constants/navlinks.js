import { HOME_ROUTE, PRODUCTS_ROUTE, HEALTH_TIPS_ROUTE, FASHION_ROUTE, BLOG_ROUTE, OFFERS_ROUTE } from "./routes";

const navlinks = [
    // {
    //     label: "Shop",
    //     route: 'javascript:void(0)'
    // }, 
    {
        label: "Products",
        route: PRODUCTS_ROUTE
    },
    {
        label: "Offers",
        route: OFFERS_ROUTE
    },
    {
        label: "Fashion",
        route: FASHION_ROUTE
    },
    {
        label: "Health Tips",
        route: HEALTH_TIPS_ROUTE
    },
    {
        label: "Blog",
        route: BLOG_ROUTE
    },
]

export default navlinks;