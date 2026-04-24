import { z } from "zod";

const addStarReviewSchema = z.object({
  productId:z.string(),
  rating: z
    .number({
      required_error: "rating is required"
    })
    .min(1)
    .max(5),
});


export default addStarReviewSchema;