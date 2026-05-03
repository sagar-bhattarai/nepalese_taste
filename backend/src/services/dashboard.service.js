import ProductModel from "../models/Product.model.js";
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
    try {
        // Total Products
        const totalProducts = await ProductModel.countDocuments();


        // Total Stock
        const stockResult = await ProductModel.aggregate([
            { $group: { _id: null, totalStock: { $sum: "$stock" } } }
        ]);
        const totalStock = stockResult[0]?.totalStock || 0;


        // Order Today
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const enfOfDay = new Date();
        enfOfDay.setHours(23, 59, 59, 999);
        const orderToday = await OrderModel.countDocuments({
            orderDate: { $gte: startOfDay, $lte: enfOfDay }
        });


        // Revenue
        const revenueResult = await OrderModel.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
        ]);
        const revenue = revenueResult[0]?.totalRevenue || 0;


        // Out Of Stock
        const outOfStock = await ProductModel.find({ stock: 0 })
            .select("productName stock")
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
        const lowStock = await ProductModel.find({ stock: { $gt: 0, $lt: 5 } })
            .select("productName stock")
            // .populate("categoryId", "categoryName");
            .populate("categoryId");



        const dashboardData = {
            totalProducts,
            totalStock,
            orderToday,
            revenue,
            outOfStock,
            highestSaleProduct,
            lowStock
        };

        // console.log("dashboardData",dashboardData)

        return dashboardData;
    } catch (error) {
        throw {
            statusFromService: 500,
            msgFromService: "error while fetching dashboard summary"
        }
    }
}


export default { customerSummary, adminSummary }