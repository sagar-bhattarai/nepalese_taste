import ProductModel from "../models/Product.model.js";
import UserModel from "../models/User.model.js";
import OrderModel from "../models/Order.model.js";
import { ALL___ORDER___CONFIRMED, ALL___ORDER___PAID } from "../constants/order.constant.js"


const customerSummary = async () => {
    try {

        // const [result, totalOrders] = await Promise.all([
        //     OrderModel.aggregate([
        //         {
        //             $match: { orderStatus: ALL___ORDER___CONFIRMED } //  filter confirmed
        //         },
        //         {
        //             $group: {
        //                 _id: null,
        //                 totalRevenue: { $sum: "$totalPrice" }, //  sum totalPrice
        //                 confirmedCount: { $sum: 1 } // optional count of confirmed
        //             }
        //         }
        //     ]),
        //     OrderModel.countDocuments() //  total orders in DB
        // ]);

        // const totalRevenue = result[0]?.totalRevenue || 0;
        // const confirmedCount = result[0]?.confirmedCount || 0;

        // return { totalRevenue, confirmedCount, totalOrders }



        const [result, totalOrders] = await Promise.all([
            OrderModel.aggregate([
                {
                    $match: {
                        orderStatus: {
                            $in: [ALL___ORDER___CONFIRMED, ALL___ORDER___PAID]
                        }
                    }
                },
                {
                    $group: {
                        _id: "$orderStatus", //  separate by status
                        totalRevenue: { $sum: "$totalPrice" },
                        count: { $sum: 1 }
                    }
                }
            ]),
            OrderModel.countDocuments()
        ]);

        // convert array → object (easy to use)
        const stats = {
            confirmed: {
                totalRevenue: 0,
                count: 0
            },
            paid: {
                totalRevenue: 0,
                count: 0
            }
        };

        result.forEach(item => {
            if (item._id === ALL___ORDER___CONFIRMED) {
                stats.confirmed = item;
            }
            if (item._id === ALL___ORDER___PAID) {
                stats.paid = item;
            }
        });



        const forYouProducts = await ProductModel.aggregate([
            {
                $match: {
                    averageRating: {
                        $exists: true,
                        $gt: 3
                    }
                },
            },
            {
                $limit: 6 // only 6 products
            }
        ]);

        return {
            order: { confirmed: stats.confirmed, paid: stats.paid, totalOrders },
            products: forYouProducts
        }

    } catch (error) {
        throw {
            statusFromService: 500,
            msgFromService: "error while fetching dashboard summary"
        }
    }
}

const adminSummary = async () => {
    // Total Products
    const totalProducts = await ProductModel.countDocuments();

    // Total Users
    const totalUsers = await UserModel.countDocuments();

    // Total Orders
    {/* 
            const [confirmed, paid] = await Promise.all([
                OrderModel.countDocuments({ orderStatus: "ALL___ORDER___CONFIRMED" }),
                OrderModel.countDocuments({ orderStatus: "ALL___ORDER___PAID" }),
            ]);
        */}

    {/* */ }
    const totalOrders = await OrderModel.countDocuments({
        orderStatus: { $in: ["ALL___ORDER___CONFIRMED", "ALL___ORDER___PAID"] }
    });



    // Total Stock
    const stockResult = await ProductModel.aggregate([
        { $group: { _id: null, totalStock: { $sum: "$productStock" } } }
    ]);
    const totalStock = stockResult[0]?.totalStock || 0;


    // Order Today
    {/*
            IMPORTANT(timezone issue)
            If your server is not in Nepal timezone, today may be wrong.
            Better(for Nepal 🇳🇵): 
        */}
    // const now = new Date();
    // const startOfDay = new Date(now.setHours(0, 0, 0, 0));   // use now, for Nepal  
    // const endOfDay = new Date(now.setHours(23, 59, 59, 999));   // use now, for Nepal  
    const startOfDay = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })
    );
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })
    );
    endOfDay.setHours(23, 59, 59, 999);

    // const orderToday = await OrderModel.countDocuments({
    //     createdAt: { $gte: startOfDay, $lte: enfOfDay },
    //     status: {
    //         $in: ["ALL___ORDER___CONFIRMED", "ALL___ORDER___PAID"],
    //     },
    // });





    const orderToday = await OrderModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                },
                orderStatus: {
                    $in: [ALL___ORDER___CONFIRMED, ALL___ORDER___PAID],
                },
            },
        },

        //  unwind items (important)
        { $unwind: "$items" },

        // join product
        {
            $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "product",
            },
        },

        // convert array → object
        { $unwind: "$product" },

        // optional: join category
        {
            $lookup: {
                from: "categories",
                localField: "product.categoryId",
                foreignField: "_id",
                as: "category",
            },
        },

        {
            $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
            },
        },

        //  final structure
        {
            $project: {
                _id: 1,
                orderStatus: 1,
                totalPrice: 1,
                createdAt: 1,

                product: {
                    _id: "$product._id",
                    productName: "$product.productName",
                    productPrice: "$product.productPrice",
                },

                category: {
                    categoryName: "$category.categoryName",
                },

                quantity: "$items.quantity",
                deliveryType: "$deliveryType",
                totalPrice:'$totalPrice'
            },
        },
    ]);


    // Revenue
    const revenueResult = await OrderModel.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
    ]);
    const revenue = revenueResult[0]?.totalRevenue || 0;


    // Out Of Stock
    const outOfStock = await ProductModel.find({ stock: 0 })
        .select("productName productStock")
        // .populate("categoryId", "categoryName");
        .populate("categoryId");



    // Highest Sale Product
    const highestSaleResult = await OrderModel.aggregate([
        { $group: { _id: '$product', totalQuantity: { $sum: "$quantity" } } },
        { $sort: { totalQuantity: -1 } },
        { $limit: 1 },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },
        { $unwind: "$product" },
        {
            $lookup: {
                from: "categories",
                localField: "product.categoryId",
                foreignField: "_id",
                as: "product.categoryId"
            }
        },
        { $unwind: "$product.categoryId" },
        {
            $project: {
                name: "$product.productName",
                category: "$product.categoryId.categoryName",
                totalQuantity: 1
            }
        }
    ]);
    const highestSaleProduct = highestSaleResult[0] || { message: "No sale data available" };



    // Low Stock Product
    const lowStock = await ProductModel.find({ productStock: { $gt: 0, $lt: 5 } })
        .select("productName productStock")
        // .populate("categoryId", "categoryName");
        .populate("categoryId");



    const dashboardData = {
        totalProducts,
        totalUsers,
        totalOrders,
        totalStock,
        orderToday,
        revenue,
        outOfStock,
        highestSaleProduct,
        lowStock
    };

    // console.log("dashboardData",dashboardData)

    return dashboardData;

}


export default { customerSummary, adminSummary }