import OrderModel from "../models/Order.model.js";
import PaymentModel from "../models/Payment.model.js";
import productService from "../services/product.service.js"
import ProductModel from "../models/Product.model.js";
import crypto from "crypto";
import config from "../configs/config.js";
import mongoose from "mongoose";
import {
    ORDER___PENDING,
    ORDER___PAID,
    ORDER___CONFIRMED,
    ORDER___DELIVERED,
    ORDER___SHIPPED,

    CASH___ORDER___PENDING,
    ALL___ORDER___PENDING,
    ALL___ORDER___PAID,
    ALL___ORDER___CONFIRMED,
    ALL___ORDER___DELIVERED,
    ALL___ORDER___SHIPPED,

    ORDER___FREE___DELIVERY,
    ORDER___FAST___DELIVERY,
    ORDER___EXPRESS___DELIVERY
} from "../constants/order.constant.js";
import createLogFile from "../utility/createLogFile.js";
import { payViaKhalti, payViaStripe } from "../utility/payment.js";


const findOrderOnDb = async (orderIdOrTrackingId, searchType) => {
    if (searchType === "trackingId") {
        return await OrderModel.findOne({ trackingId: orderIdOrTrackingId });
    } else {
        return await OrderModel.findById(orderIdOrTrackingId);
    }
};

const add = async (req) => {
    try {
        const items = req.body.orderItem;
        const requestFrom = req.body.requestedFrom;
        const deliveryPrice = req.body.deliveryPrice;
        let delivery = ORDER___FREE___DELIVERY;
        let orderStatus = ALL___ORDER___PENDING;

        if (deliveryPrice === 15) {
            delivery = ORDER___FAST___DELIVERY
        } else if (deliveryPrice === 49) {
            delivery = ORDER___EXPRESS___DELIVERY
        }

        if (!items || items.length === 0) {
            throw {
                serviceserviceStatus: 400,
                msgFromService: "Order items required",
            };
        }

        // ✅ Fetch all products at once (optimized)
        const productIds = items.map(i => i.productId);

        const products = await ProductModel.find({
            _id: { $in: productIds }
        })

        // Convert to map for fast lookup
        const productMap = {};
        products.forEach(p => {
            productMap[p._id.toString()] = p;
        });

        let orderItems = [];
        let grandTotal = 0;


        // ✅ Validate + build order
        for (const item of items) {
            const product = productMap[item.productId];

            if (!product) {
                throw {
                    serviceserviceStatus: 404,
                    msgFromService: `Product not found: ${item.productId}`,
                };
            }

            if (item.quantity > product.productStock) {
                throw {
                    serviceserviceStatus: 409,
                    msgFromService: `Insufficient stock for ${product.productName}`,
                };
            }

            const price = product.productPrice;

            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price,
                itemOrderStatus: ORDER___PENDING,
            });

            grandTotal += price * item.quantity;
        }



        let discount = Math.ceil(grandTotal * 0.05); // 5 %
        let tax = Math.ceil(grandTotal * 0.13); // 13 %
        grandTotal = grandTotal - discount + tax + deliveryPrice;

        if ((grandTotal - deliveryPrice) !== req.body.totalPrice) {
            const fileName = "high_alert.log";
            const logMessage = `\n\n <<<<<<<<<<<<    High Alert !!   >>>>>>>>>>>> \n ${req.user} \n ----- this user tried to alter the price -----\n \n`;
            await createLogFile(fileName, logMessage);
        }

        if (requestFrom === "CASH") {
            grandTotal += 15;
            orderStatus = CASH___ORDER___PENDING
        }

        const trackingId = crypto.randomUUID();

        const order = await OrderModel.create([{
            customerId: req.user._id,
            items: orderItems,
            totalPrice: grandTotal,
            orderStatus: orderStatus,
            trackingId: trackingId,
            paymentMethod: requestFrom,
            deliveryType: delivery,
            deliveryAddress: req.body.shippingAddress
        }]);

        // ✅ Update stock (atomic)
        for (const item of orderItems) {
            await ProductModel.updateOne(
                { _id: item.productId },
                { $inc: { productStock: -item.quantity } },
            );
        }

        // let paymentResult = null;

        // // 💳 Payment handling
        // switch (requestFrom) {
        //     case "khalti":
        //         // paymentResult = await paymentViaKhalti(order[0], req.user);
        //         break;

        //     case "esewa":
        //         // paymentResult = await handleEsewa(order[0], req.user);
        //         break;

        //     case "card":
        //         paymentResult = await paymentViaStripeCard(order[0], req.user);
        //         break;

        //     default:
        //         // paymentResult = await paymentViaCash(order[0]);
        //         //  paymentResult = await paymentViaCash(orderCreated._id, trackingId, grandTotal, req.user);
        //         //  paymentResult = await paymentViaCash(order._id, trackingId, grandTotal, req.user);
        //         break;
        // }


        return {
            success: true,
            order: order[0],
            // payment: paymentResult,
        };

    } catch (error) {
        throw error;
    }
};

const all = async (req) => {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    let matchStage = {};
    if (req.user.userRole === "customer") {
        matchStage.customerId = userId;
    }

    const isAdmin = req.user.userRoles.some(r => r === "ADMIN");

    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 5;
    const skip = (page - 1) * size;

    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const result = await OrderModel.aggregate([
        { $match: matchStage },
        {
            $sort: { [sortBy]: order }
        },

        // 👤 customer join
        {
            $lookup: {
                from: "users",
                localField: "customerId",
                foreignField: "_id",
                as: "customer"
            }
        },
        { $unwind: "$customer" },

        // 🛒 lookup products INSIDE items
        {
            $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "products"
            }
        },

        // 🔥 merge product into items
        {
            $addFields: {
                items: {
                    $map: {
                        input: "$items",
                        as: "item",
                        in: {
                            quantity: "$$item.quantity",
                            price: "$$item.price",
                            itemOrderStatus: "$$item.itemOrderStatus",

                            product: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$products",
                                            as: "p",
                                            cond: { $eq: ["$$p._id", "$$item.productId"] }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    }
                }
            }
        },

        // 📦 category lookup inside each product
        {
            $lookup: {
                from: "categories",
                localField: "items.product.categoryId",
                foreignField: "_id",
                as: "categories"
            }
        },

        // 🎯 final projection
        {
            $project: {
                _id: 1,
                createdAt: 1,
                trackingId: 1,
                orderStatus: 1,
                totalPrice: 1,
                deliveryType: 1,

                ...(isAdmin && {
                    customer: {
                        _id: "$customer._id",
                        name: "$customer.userName",
                        email: "$customer.userEmail"
                    }
                }),

                items: {
                    $map: {
                        input: "$items",
                        as: "item",
                        in: {
                            quantity: "$$item.quantity",
                            price: "$$item.price",
                            itemOrderStatus: "$$item.itemOrderStatus",

                            productId: "$$item.product._id",
                            productName: "$$item.product.productName",
                            productImage: "$$item.product.productImage",
                            productDescription: "$$item.product.productDescription",
                        }
                    }
                }
            }
        },

        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: size }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ]);

    const orders = result[0].data;
    const total = result[0].totalCount[0]?.count || 0;

    return { orders, total };
};

const merchantOrders = async (merchantId) => {
    const orders = await OrderModel.aggregate([
        // 1. Break items array
        { $unwind: "$items" },

        // 2. Lookup product
        {
            $lookup: {
                from: "products",
                localField: "items.productId",
                foreignField: "_id",
                as: "product",
            },
        },
        { $unwind: "$product" },

        // 3. Match only this merchant's products
        {
            $match: {
                "product.supplierId": merchantId,
            },
        },

        // 4. Lookup supplier (merchant info)
        {
            $lookup: {
                from: "suppliers",
                localField: "product.supplierId",
                foreignField: "_id",
                as: "supplier",
            },
        },
        { $unwind: "$supplier" },

        // 5. Projection (merchant view)
        {
            $project: {
                _id: 1,
                orderDate: "$createdAt",
                trackingId: 1,
                orderStatus: 1,

                productId: "$product._id",
                productName: "$product.productName",
                productImage: "$product.productImage",
                productDescription: "$product.productDescription",

                supplierName: "$supplier.supplierName",

                quantity: "$items.quantity",
                price: "$items.price",
                itemTotal: {
                    $multiply: ["$items.quantity", "$items.price"],
                },
            },
        },
    ]);

    // console.log("orders", orders)
    if (!orders.length) {
        throw {
            serviceStatus: 404,
            msgFromService: "No orders found for this merchant",
        };
    }

    return orders;
};

const update = async (id, status) => {
    const updated = await OrderModel.findOneAndUpdate(id, { orderStatus: status }, { new: true });

    if (!updated) {
        throw {
            statusFromService: 400,
            msgFromService: "could not update Order status",
        };
    }

    return updated;
};

const cancel = async (id) => {
    const cancelled = await OrderModel.findByIdAndUpdate(id, { orderStatus: "CANCELLED" });

    if (!cancelled) {
        throw {
            statusFromService: 400,
            msgFromService: "could not cancel Order",
        };
    }

    return cancelled;
};

const confirmOrderPayment = async (id, status) => {
    const order = await findOrderOnDb(id, "transactionId");

    if (status !== "COMPLETED") {
        await PaymentModel.findOneAndUpdate(order.payment, { status: "FAILED" });
        throw {
            statusFromService: 400,
            msgFromService: "Payment Failed",
        };
    }

    await PaymentModel.findOneAndUpdate(order.payment, { status: "PAID" });

    // return await OrderModel.findByIdAndUpdate(id, { status: "CONFIRMED" }, { new: true });
    return await OrderModel.findOneAndUpdate(order._id, { $set: { orderStatus: "ALL_CONFIRMED" } }, { new: true });
}

const paymentViaKhalti = async (id, trackingId, grandTotal, user) => {
    const order = await findOrderOnDb(id, "id");

    const orderPayment = await PaymentModel.create({
        transactionId: trackingId,
        method: "ONLINE",
        amount: grandTotal,
    })

    const updated = await OrderModel.findByIdAndUpdate(id, {
        payment: orderPayment._id
    })

    const khaltiPayload = {
        return_url: config.return_url,
        website_url: config.website_url,
        amount: `${grandTotal * 100}`,
        trackingId: order.trackingId,
        purchase_order_name: "Multiple Products",
        customer_info: {
            name: user.userName,
            email: user.userEmail,
            phone: user.phone || "9999999999",
        },
    };
    const reqResult = await payViaKhalti(khaltiPayload);

    // console.log("reqResult", reqResult)

    if (!reqResult) {
        throw {
            serviceserviceStatus: 409,
            msgFromService: "Error while requesting vendor",
        };
    }
    return reqResult;
}

const paymentViaCash = async (id, user) => {
    const order = await findOrderOnDb(id, "id");

    const orderPayment = await PaymentModel.create({
        transactionId: order.trackingId,
        method: "CASH",
        amount: order.totalPrice,
    })

    const orderUpdated = await OrderModel.findByIdAndUpdate(id, {
        payment: orderPayment._id,
        orderStatus: "CASH_PENDING"
    }, { new: true })

    return {
        method: orderPayment.method,
        paymentStatus: orderPayment.status,
        orderStatus: orderUpdated.orderStatus,
    }
     
}

// const paymentViaStripeCard = async (id, trackingId, grandTotal, user) => {
const paymentViaStripeCard = async (req, user) => {

    const order = await findOrderOnDb(req.params.id, "id");

    const orderPayment = await PaymentModel.create({
        transactionId: order.trackingId,
        method: "CARD",
        amount: order.totalPrice,
    })

    const orderUpdated = await OrderModel.findByIdAndUpdate(req.params.id, {
        payment: orderPayment._id
    })


    const stripePayload = {
        amount: order.totalPrice * 100,   // in paisa
        orderId: order.trackingId,
        orderName: "Multiple Products",
        customer: user,
    };

    const reqResult = await payViaStripe(stripePayload);

    if (!reqResult) {
        throw {
            serviceserviceStatus: 409,
            msgFromService: "Error while requesting vendor",
        };
    }

    
    return {
        method: orderPayment.method,
        paymentStatus: orderPayment.status,
        orderStatus: orderUpdated.orderStatus,
        client_secret: reqResult.client_secret
    }

    // return reqResult; 
}

export default {
    add,
    all,
    update,
    cancel,
    findOrderOnDb,
    confirmOrderPayment,
    paymentViaStripeCard,
    paymentViaKhalti,
    paymentViaCash,
};

























// const add = async (req) => {
//     // const { return_url, totalPrice, trackingId, purchase_order_name, name, email, phone } = data;
//     const items = req.body.orderItem;
//     // console.log(items)

//     items.map(async (item) => {
//         const product = await productService.findProductOnDb(item.productId, "id");
//         if (!product) {
//             throw {
//                 serviceserviceStatus: 409,
//                 msgFromService: "product not found",
//             };
//         }

//         if (item.stock > product.stock) {
//             throw {
//                 serviceserviceStatus: 409,
//                 msgFromService: "not enough stock",
//             };
//         }
//         return true;
//     });

//     let grandTotal = 0;
//     let requestFrom = req.body.requestedFrom;

//     const orders = items.map((item) => {
//         // grandTotal += item.totalPrice;
//         // requestFrom = item.requestFrom;

//         return {
//             productId: item.productId,
//             quantity: item.quantity,
//             // price: item.totalPrice,
//             price: item.price,
//         };
//     });



//     const customerId = req.user._id;
//     const orderStatus = "PENDING";
//     // const orderDate = new Date().toISOString().split('T')[0];
//     const orderDate = new Date();
//     // let trackingId = crypto.randomBytes(8).toString("hex");  // trackingId
//     // trackingId = `${config.tracking_order_constant}${trackingId}`;
//     let trackingId = crypto.randomUUID();


//     // const data = {
//     //     customerId,
//     //     productId,   // --- for single ---
//     //     quantity,    // --- for single ---
//     //     totalPrice: grandTotal,
//     //     orderDate,
//     //     orderStatus,
//     //     trackingId: trackingId
//     // }


//     grandTotal = req.body.totalPrice;

//     if (requestFrom === "cash") {
//         grandTotal += 15;
//     }

//     const orderCreated = await OrderModel.create({
//         customerId,
//         items: orders,
//         orderStatus,
//         totalPrice: grandTotal,
//         trackingId: trackingId
//     });

//     if (!orderCreated) {
//         throw {
//             serviceserviceStatus: 409,
//             msgFromService: "could not create order",
//         };
//     }

//     // console.log("orderCreated", orderCreated)

//     let result = null;

//     switch (requestFrom) {
//         case "card": {
//             // result = await orderPaymentviaCard(orderCreated._id, trackingId, grandTotal, req.user);
//             break;
//         }
//         case "esewa": {
//             // result = await orderPaymentviaEsewa(orderCreated._id, trackingId, grandTotal, req.user);
//             break;
//         }
//         case "khalti": {
//             // result = await paymentViaKhalti(orderCreated._id, trackingId, grandTotal, req.user);
//             break;
//         }
//         default: { // cash on delivery
//             result = await paymentViaCash(orderCreated._id, trackingId, grandTotal, req.user);
//             break;
//         }
//     }
//     return result;
// };

// const all = async (req) => {
//     const userId = new mongoose.Types.ObjectId(req.user._id);

//     // role-based match
//     let matchStage = {};
//     if (req.user.userRole === "customer") {
//         matchStage.customerId = userId;
//     }

//     // Admin projection
//     const adminProjection = {
//         _id: 1,
//         orderDate: 1,
//         trackingId: 1,
//         orderStatus: 1,
//         totalAmount: 1,

//         customerId: "$customer._id",
//         customerName: "$customer.userName",
//         customerEmail: "$customer.userEmail",
//         customerRole: "$customer.userRole",

//         productId: "$product._id",
//         productName: "$product.productName",
//         productImage: "$product.productImage",
//         productDescription: "$product.productDescription",
//         categoryName: "$product.category.categoryName",
//         // supplierName: "$product.supplier.supplierName",

//         quantity: "$items.quantity",
//         totalPrice: "$totalPrice", // order model attribute
//     };

//     // Customer projection
//     const customerProjection = {
//         _id: 1,
//         orderDate: 1,
//         trackingId: 1,
//         orderStatus: 1,
//         totalAmount: 1,

//         productId: "$product._id",
//         productName: "$product.productName",
//         productImage: "$product.productImage",
//         productDescription: "$product.productDescription",
//         categoryName: "$product.category.categoryName",
//         // supplierName: "$product.supplier.supplierName",

//         quantity: "$items.quantity",
//         totalPrice: "$totalPrice",  // order model attribute
//     };

//     const isAdmin = req.user.userRoles.some(r => r == "ADMIN");

//     const projection = isAdmin ? adminProjection : customerProjection;

//     const page = Number(req.query.page) || 1;
//     const size = Number(req.query.size) || 3;
//     const skip = (page - 1) * size;
//     const result = await OrderModel.aggregate([
//         { $match: matchStage },
//         { $lookup: { from: "users", localField: "customerId", foreignField: "_id", as: "customer" } },
//         { $unwind: "$customer" },
//         { $unwind: "$items" },
//         {
//             $lookup: {
//                 from: "products",
//                 let: { productId: "$items.productId" },
//                 pipeline: [
//                     { $match: { $expr: { $eq: ["$_id", "$$productId"] } } },
//                     { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } },
//                     { $unwind: "$category" },
//                     // { $lookup: { from: "suppliers", localField: "supplierId", foreignField: "_id", as: "supplier" } },
//                     // { $unwind: "$supplier" },
//                 ],
//                 as: "product",
//             }
//         },
//         { $unwind: "$product" },

//         // { $project: projection },
//         // $facet stage to get paginated results and total count together
//         {
//             $facet: {
//                 data: [
//                     { $skip: skip },
//                     { $limit: size },
//                     { $project: projection }
//                 ],
//                 totalCount: [
//                     { $count: "count" }
//                 ]
//             }
//         }
//     ])  // .skip((page - 1) * size).limit(size);

//     if (!result) {
//         throw {
//             serviceStatus: 409,
//             msgFromService: "No Any Order Found",
//         };
//     }


//     // console.log(result[0].data);

//     const orders = result[0].data;
//     const total = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;

//     return { orders, total };
//     // return result;
// };
