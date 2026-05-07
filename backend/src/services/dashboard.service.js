import ProductModel from "../models/Product.model.js";
import UserModel from "../models/User.model.js";
import OrderModel from "../models/Order.model.js";
import {
    ALL___ORDER___CONFIRMED,
    ALL___ORDER___PAID,
    ALL___ORDER___PENDING,
    ALL___ORDER___DELIVERED,
    ALL___ORDER___SHIPPED,
    CASH___ORDER___PENDING
} from "../constants/order.constant.js"


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
    const totalOrders = await OrderModel.countDocuments();

    // Total Stock
    const stockResult = await ProductModel.aggregate([
        { $group: { _id: null, totalStock: { $sum: "$productStock" } } }
    ]);
    const totalStock = stockResult[0]?.totalStock || 0;

    // Out Of Stock
    const outOfStock = await ProductModel.countDocuments({ productStock: { $lt: 1 } });
    const outOfStockPercentage = (totalProducts === 0) ? 0 : ((outOfStock / totalProducts) * 100).toFixed(2);


    // Low Stock Product
    const [lowStockProducts, lowStockCount] = await Promise.all([
        ProductModel.find({ productStock: { $gt: 0, $lt: 5 }, }).limit(10)
        // .select("productName productStock categoryId")
        // .populate("categoryId", "categoryName")
        // .lean()
        ,
        ProductModel.countDocuments({
            productStock: { $gt: 0, $lt: 5 },
        }),
    ]);
    const lowStockPercentage = (totalProducts === 0) ? 0 : ((lowStockCount / totalProducts) * 100).toFixed(2);

    // Order Today
    const startOfDay = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }));
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }));
    endOfDay.setHours(23, 59, 59, 999);

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
        {
            $limit: 5 // only 5 products
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
                totalPrice: '$totalPrice'
            },
        },
    ]);

    // TODAY STATS
    const todayStats = await OrderModel.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfDay, $lte: endOfDay },
                orderStatus: {
                    $in: [
                        ALL___ORDER___CONFIRMED,
                        ALL___ORDER___PAID,
                        CASH___ORDER___PENDING,
                    ]
                },
            },
        },
        {
            $group: {
                _id: null,
                orders: { $sum: 1 },
                revenue: { $sum: "$totalPrice" },
            },
        },
    ]);

    // TOTAL STATS
    const totalStats = await OrderModel.aggregate([
        {
            $match: {
                orderStatus: { $in: [ALL___ORDER___CONFIRMED, ALL___ORDER___PAID] },
            },
        },
        {
            $group: {
                _id: null,
                orders: { $sum: 1 },
                revenue: { $sum: "$totalPrice" },
            },
        },
    ]);

    const dashboardData = {
        totalProducts,
        totalUsers,
        totalOrders,
        orderToday,
        outOfStock,
        lowStockCount,
        lowStockProducts,
        outOfStockPercentage,
        lowStockPercentage,
        today: {
            orders: todayStats[0]?.orders || 0,
            revenue: todayStats[0]?.revenue || 0,
        },
        total: {
            orders: totalStats[0]?.orders || 0,
            revenue: totalStats[0]?.revenue || 0,
        },
    };

    return dashboardData;

}

const chartsData = async () => {
    const monthlyStats = await getMonthlyStats();
    const topSellingProducts = await getTopProducts();

    return {
        monthlyStats,
        topSellingProducts,
    };
}

const getMonthlyStats = async () => {
    const stats = await OrderModel.aggregate([
        {
            $match: {
                orderStatus: { $in: [ALL___ORDER___CONFIRMED, ALL___ORDER___PAID] },
            },
        },

        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m",
                        date: "$createdAt",
                        timezone: "Asia/Kathmandu",
                    },
                },
                orders: { $sum: 1 },
                revenue: { $sum: "$totalPrice" },
            },
        },

        {
            $sort: { _id: 1 },
        },
    ]);

    return stats;
};

const getTopProducts = async () => {
    return await OrderModel.aggregate([
        { $unwind: "$items" },

        {
            $group: {
                _id: "$items.productId",
                totalSold: { $sum: "$items.quantity" },
            },
        },

        { $sort: { totalSold: -1 } },
        { $limit: 10 },

        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
            },
        },

        { $unwind: "$product" },

        {
            $project: {
                productName: "$product.productName",
                productPrice: "$product.productPrice",
                productImage: { $arrayElemAt: ["$product.productImage", 0] },
                totalSold: 1,
            },
        },
    ]);
};

export default { customerSummary, adminSummary, chartsData }