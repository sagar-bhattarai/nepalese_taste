import orderService from "../services/order.service.js";
import config from "../configs/config.js";

const createOrder = async (req, res) => {
    try {
        const created = await orderService.add(req);

        return res.status(200).json(
            {
                api: config.api,
                order: created,
                message: "order created successfully"
            },
        );
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "order name must be unique" });
        }
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "server error while adding order." });
    }
};

const getOrderByTrackingId = async (req, res) => { };

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.all(req);

        return res
            .status(200)
            .json({ api: config.api, result: orders, message: "orders fetched successfully." });
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "server error while fetching all order." })

    }
};

const updateOrderStatus = async (req, res) => {
    try {
        if (!req.body.status) {
            throw "status is required";
        }
        const updated = await orderService.update(req.params.id, req.body.status);
        return res
            .status(200)
            .json(
                { api: config.api, order: updated, message: "order updated successfully" },
            );
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "error while updating order" });
    }
};

const updateOrderPayment = async (req, res) => {
    try {
        if (!req.body.status) {
            throw "status is required";
        }
        const updated = await orderService.confirmOrderPayment(req.params.id, req.body.status);
        return res
            .status(200)
            .json(
                { api: config.api, orderPayment: updated, message: "payment updated successfully" },
            );
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "error while updating payment" });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const canceled = await orderService.cancel(req.params.id);
        return res
            .status(200)
            .json(
                { api: config.api, order: canceled, message: "order canceled successfully" },
            );
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "error while canceling order" });
    }
};

const confirmOrder = async (req, res) => {
    try {
        if (!req.body.status) {
            return res
                .status(400)
                .json({ message: "order status is required" });
        }
        const confirmOrder = await orderService.confirmOrderPayment(req.params.id, req.body.status);

        console.log("confirmOrder", confirmOrder)

        return res
            .status(200)
            .json(
                { api: config.api, order: confirmOrder, message: "order confirmed successfully" },
            );
    } catch (error) {
        console.log("error", error)
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "error while confirming order" });
    }
};

const orderPaymentviaStripe = async (req, res) => {
    try {
        const result = await orderService.orderPaymentviaStripeCard(req, req?.user);

        return res
            .status(200)
            .json(
                { api: config.api, result, message: "order via stripe successfull" },
            );
    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ message: error.msgFromService || "order via stripe failed" });
    }
}
export {
    createOrder,
    getOrderByTrackingId,
    getAllOrders,
    updateOrderStatus,
    cancelOrder,
    confirmOrder,
    orderPaymentviaStripe,
    updateOrderPayment
};
