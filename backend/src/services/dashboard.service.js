import ProductModel from "../models/Product.model.js";
import OrderModel from "../models/Order.model.js";


const summary = async () => {
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
        const highestSaleProduct = highestSaleResult[0] || {message: "No sale data available"};



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

export default { summary }