import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    categoryDescription: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
