import OrderModel from "../models/Order.model.js";
import PaymentModel from "../models/Payment.model.js";
import productService from "../services/product.service.js"
import crypto from "crypto";
import config from "../configs/config.js";
import mongoose from "mongoose";
// import request from "request";

const findOrderOnDb = async (orderIdOrTrackingId, searchType) => {
    if (searchType === "trackingId") {
        return await OrderModel.findOne({ trackingId: orderIdOrTrackingId });
    } else {
        return await OrderModel.findById(orderIdOrTrackingId);
    }
};

const add = async (req) => {
    // const { return_url, totalPrice, purchase_order_id, purchase_order_name, name, email, phone } = data;
    const items = req.body.requestData;

    items.map(async (item) => {
        const product = await productService.findProductOnDb(item.productId, "id");
        if (!product) {
            throw {
                serviceserviceStatus: 409,
                msgFromService: "product not found",
            };
        }

        if (item.stock > product.stock) {
            throw {
                serviceserviceStatus: 409,
                msgFromService: "not enough stock",
            };
        }
        return true;
    });

    let grandTotal = 0;
    let requestFrom = '';

    const orders = items.map((item) => {
        grandTotal += item.totalPrice;
        requestFrom = item.requestFrom;

        return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.totalPrice,
        };
    });


    const customerId = req.user._id;
    const orderStatus = "PENDING";
    // const orderDate = new Date().toISOString().split('T')[0];
    const orderDate = new Date();
    // let purchase_order_id = crypto.randomBytes(8).toString("hex");  // purchase_order_id
    // purchase_order_id = `${config.tracking_order_constant}${purchase_order_id}`;
    let purchase_order_id = crypto.randomUUID();


    // const data = {
    //     customerId,
    //     productId,   // --- for single ---
    //     quantity,    // --- for single ---
    //     totalPrice: grandTotal,
    //     orderDate,
    //     orderStatus,
    //     trackingId: purchase_order_id
    // }


    if (requestFrom === "cash") {
        grandTotal += 15;
    }

    const orderCreated = await OrderModel.create({
        customerId,
        items: orders,
        orderStatus,
        totalPrice: grandTotal,
        trackingId: purchase_order_id
    });


    if (!orderCreated) {
        throw {
            serviceserviceStatus: 409,
            msgFromService: "could not create order",
        };
    }

    // console.log("orderCreated", orderCreated) 

    const result = null;

    switch (requestFrom) {
        case "card": {
            // result = await orderPaymentviaCard(orderCreated._id, purchase_order_id, grandTotal, req.user);
            break;
        }
        case "esewa": {
            // result = await orderPaymentviaEsewa(orderCreated._id, purchase_order_id, grandTotal, req.user);
            break;
        }
        case "khalti": {
            result = await orderPaymentviaKhalti(orderCreated._id, purchase_order_id, grandTotal, req.user);
            break;
        }
        default: { // cash on delivery  
            result = await orderPaymentviaCash(orderCreated._id, purchase_order_id, grandTotal, req.user);
            break;
        }
    }
    return result;
};

const all = async (req) => {
   const userId = new mongoose.Types.ObjectId(req.user._id);

    // role-based match
    let matchStage = {};
    if (req.user.userRole === "customer") {
        matchStage.customerId = userId;
    }

    // Admin projection
    const adminProjection = {
        _id: 1,
        orderDate: 1,
        trackingId: 1,
        orderStatus: 1,
        totalAmount: 1,

        customerId: "$customer._id",
        customerName: "$customer.userName",
        customerEmail: "$customer.customerEmail",
        customerRole: "$customer.userRole",

        productId: "$product._id",
        productName: "$product.productName",
        productImage: "$product.productImage",
        productDescription: "$product.productDescription",
        categoryName: "$product.category.categoryName",
        supplierName: "$product.supplier.supplierName",

        quantity: "$items.quantity",
        totalPrice: "$totalPrice", // order model attribute
    };

    // Customer projection
    const customerProjection = {
        _id: 1,
        orderDate: 1,
        trackingId: 1,
        orderStatus: 1,
        totalAmount: 1,

        productId: "$product._id",
        productName: "$product.productName",
        productImage: "$product.productImage",
        productDescription: "$product.productDescription",
        categoryName: "$product.category.categoryName",
        supplierName: "$product.supplier.supplierName",

        quantity: "$items.quantity",
        totalPrice: "$totalPrice",  // order model attribute
    };



    const projection = req.user.userRole === "admin" ? adminProjection : customerProjection;

    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 3;
    const skip = (page - 1) * size;
    const result = await OrderModel.aggregate([
        { $match: matchStage },
        { $lookup: { from: "users", localField: "customerId", foreignField: "_id", as: "customer" } },
        { $unwind: "$customer" },
        { $unwind: "$items" },
        {
            $lookup: {
                from: "products",
                let: { productId: "$items.productId" },
                pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$productId"] } } },
                    { $lookup: { from: "categories", localField: "categoryId", foreignField: "_id", as: "category" } },
                    { $unwind: "$category" },
                    { $lookup: { from: "suppliers", localField: "supplierId", foreignField: "_id", as: "supplier" } },
                    { $unwind: "$supplier" },
                ],
                as: "product",
            }
        },
        { $unwind: "$product" },

        // { $project: projection },
        // $facet stage to get paginated results and total count together
        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: size },
                    { $project: projection }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }
        }
    ])  // .skip((page - 1) * size).limit(size);

    if (!result) {
        throw {
            serviceStatus: 409,
            msgFromService: "No Any Order Found",
        };
    }

    const orders = result[0].data;
    const total = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;

    return { orders, total };
    // return result;
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
    const updated = await OrderModel.findByIdAndUpdate(id, { orderStatus: status }, { new: true });

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

const payViaKhalti = async (payload) => {
    try {
        const response = await fetch(
            "https://dev.khalti.com/api/v2/epayment/initiate/",
            {
                method: "POST",
                headers: {
                    "Authorization": `${config.khalti_live_secret_key}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            // console.error("Khalti Error:", result);
            throw new Error(result.detail || "Khalti payment failed");
        }
        return result;

    } catch (error) {
        console.log(error);
    }
}

const orderPaymentviaCash = async (id, purchase_order_id, grandTotal, user) => {
    const order = await findOrderOnDb(id, "id");

    const orderPayment = await PaymentModel.create({
        transactionId: purchase_order_id,
        method: "CASH",
        amount: grandTotal,
    })

    return await OrderModel.findByIdAndUpdate(id, {
        payment: orderPayment._id,
        orderStatus: "CONFIRMED"
    })
}

const orderPaymentviaKhalti = async (id, purchase_order_id, grandTotal, user) => {
    const order = await findOrderOnDb(id, "id");

    const orderPayment = await PaymentModel.create({
        transactionId: purchase_order_id,
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
        purchase_order_id: order.trackingId,
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

const confirmOrderPayment = async (id, status) => {
    // const order = findOrderOnDb(id, "id");   // pidx
    const order = await findOrderOnDb(id, "trackingId");     // transactionId

    if (status.toUpperCase() !== "COMPLETED") {
        await PaymentModel.findByIdAndUpdate(order.payment, { status: "FAILED" });
        throw {
            statusFromService: 400,
            msgFromService: "Payment Failed",
        };
    }

    await PaymentModel.findByIdAndUpdate(order.payment, { status: "SUCCESS" });

    // return await OrderModel.findByIdAndUpdate(id, { status: "CONFIRMED" }, { new: true });
    return await OrderModel.findOneAndUpdate({ trackingId: id }, { $set: { orderStatus: "CONFIRMED" } }, { new: true });

}
export default {
    add,
    all,
    update,
    cancel,
    findOrderOnDb,
    orderPaymentviaKhalti,
    confirmOrderPayment
};
