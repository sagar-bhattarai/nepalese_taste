import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "productId is required"],
            ref: "Product",
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "customerId is required"],
            ref: "User",
            required: true,
        },
        isFavourited: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

favouriteSchema.index(
  { customerId: 1, productId: 1 },
  { unique: true }
);

const FavouriteModel = mongoose.model("Favourite", favouriteSchema);

export default FavouriteModel;
