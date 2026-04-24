import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

//  This is important
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

const StarReviewModel = mongoose.model("StarReview", reviewSchema);

export default StarReviewModel;