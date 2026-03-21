import mongoose, { Schema } from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "userId is required"]
        },
        otp: String,
        expiry: Date
    },
    { timestamps: true }
);

const OtpModel = new mongoose.model("Otp", otpSchema);

export default OtpModel;