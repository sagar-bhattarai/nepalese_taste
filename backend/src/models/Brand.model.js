import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    brandDescription: {
      type: String,
      required: [true, "Brand Description is required"],
      trim: true
    },
    brandImage: String,
  },
  {
    timestamps: true,
  }
);

const BrandModel = mongoose.model("Brand", brandSchema);

export default BrandModel;
