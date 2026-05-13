
import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "product name is required"],
            trim: true,
            unique: true
        },

        productDescription: {
            type: String,
            required: [true, "product description is required"],
            trim: true,
        },

        productStock: {
            type: Number,
            default: 0,
            min: 0
        },

        productPrice: {
            type: Number,
            default: 0,
            min: 0
        },

        oldPrice: Number,

        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "category id is required"],
        },

        brandId: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: [true, "Brand id is required"],
        },

        productWeight: Number,

        productDimension: {
            length: Number,
            breadth: Number,
            height: Number,
        },

        attributes: {
            color: {
                name: String,
                hex: String,
            },
            size: {
                type: String,
                enum: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
            },
        },

        productImage: [{ type: String }],

        isActive: {
            type: Boolean,
            default: true
        },

        // for Recommendation system
        views: { type: Number, default: 0 },
        sold: { type: Number, default: 0 },

        // for star Reviews
        averageRating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;


