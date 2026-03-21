import { mongoose, Schema } from "mongoose";

const paymentSchema = new Schema({
    transactionId: String,
    amount: {
        type: Number,
        required: [true, "payment amount is required"],
    },
    method: {
        type: String,
        required: [true, "payment amount is required"],
        enum: ["CARD", "ONLINE", "CASH"]
    },
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING"
    }
},
    {
        timestamps: true,
    }
)

const PaymentModel = mongoose.model("Payment", paymentSchema);

export default PaymentModel;