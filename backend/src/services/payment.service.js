import PaymentModel from "../models/Payment.model.js";

const add = async (req) => {
    const payment = await PaymentModel.findOne({ transactionId: req.body.transactionId });
    if (payment) {
        throw {
            statusFromService: 400,
            msgFromService: "duplicate entry."
        }
    }

    const newPayment = new PaymentModel(req.body);
    return await newPayment.save();
}

const all = async () => {
    return await PaymentModel.find();
}

const edit = async (req) => {
    const payment = await PaymentModel.findById(req.params.id);
    if (!payment) {
        throw {
            statusFromService: 400,
            msgFromService: "payment not found."
        }
    }

    return await PaymentModel.findByIdAndUpdate(req.params.id, { status: req.body.status}, { new: true }).select("transactionId status");
}

const single = async (id) => {
    return await PaymentModel.findById(id);
}

const remove = async (req) => {

    // if (!req) {
    //     throw {
    //         statusFromService: 400,
    //         msgFromService: error._message
    //     }
    // }

    // return await PaymentModel.findByIdAndDelete(req.params.id);
}

export default { add, all, edit, single, remove }