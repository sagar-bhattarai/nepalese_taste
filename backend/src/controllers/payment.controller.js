import paymentService from "../services/payment.service.js";
import config from "../configs/config.js";

const addPayment = async (req, res) => {
    try {
        const result = await paymentService.add(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "payment added successfully" });

    } catch (error) {
        console.log(error)
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while adding payment." });
    }
}

const getAllPayment = async (req, res) => {
    try {
        const result = await paymentService.all(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "payments fetched successfully." });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while fetching payments." });
    }
}

const updatePayment = async (req, res) => {
    try {
        const result = await paymentService.edit(req);

        return res
            .status(200)
            .json({ api: config.api, result, message: "payment updated successfully." });

    } catch (error) {
        return res
            .status(error.statusFromService || 500)
            .json({ error: true, message: error.msgFromService || "server error while updating payment." });
    }
}

const getPaymentById = async (req, res) => {
    try {
        const result = await paymentService.single(req.params.id);

        return res
            .status(200)
            .json({ api: config.api, result, message: "payment fetched successfully." });

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "server error while fetching payment." });
    }
}
const deletePayment = async (req, res) => {
    try {
        const result = await paymentService.remove(req.params.id);

        return res
            .status(200)
            .json({ api: config.api, result, message: "payment deleted successfully." });

    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "server error while deleting payment." });
    }
}



export { addPayment, getAllPayment, updatePayment, getPaymentById, deletePayment }