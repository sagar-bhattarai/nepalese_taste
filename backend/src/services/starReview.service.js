import StarReviewModel from "../models/StarReview.model.js";
import ProductModel from "../models/Product.model.js";


  //  upsert (create or update)
export const rateProduct = async (req) => {
  const { productId, rating } = req.body;
  const userId = req.user._id;

  // upsert rating
  await StarReviewModel.findOneAndUpdate(
    { user: userId, product: productId },
    { rating },
    { upsert: true, returnDocument: "after" }
  );

  // get all reviews
  const reviews = await StarReviewModel.find({ product: productId });

  const total = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = reviews.length ? total / reviews.length : 0;

  await ProductModel.findByIdAndUpdate(productId, {
    averageRating: avg,
    totalReviews: reviews.length,
  });

  return { success: true };
};


export default { rateProduct };
