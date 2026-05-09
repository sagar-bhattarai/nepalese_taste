import mongoose from "mongoose";

const testinomialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    testimonialRating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5
    },
    testimonialTitle: {
      type: String,
      required: [true, "testimonial Title is required"],
      trim: true
    },
    testimonialDescription: {
      type: String,
      required: [true, "testimonial Description is required"],
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const TestinomialModel = mongoose.model("Testinomial", testinomialSchema);

export default TestinomialModel;
