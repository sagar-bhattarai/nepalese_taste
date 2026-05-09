import { z } from "zod";

const updateTestinomialSchema = z.object({
  reviewId: z.string({
    required_error: "reviewId is required"
  }),
  testimonialRating: z.number({
    required_error: "rating is required"
  }),
  testimonialTitle: z
    .string({
      required_error: "testimonial title is required"
    })
    .min(3, "testinomial must be at least 3 characters"),
  testimonialDescription: z
    .string({
      required_error: "testinomial is required"
    })
    .min(3, "testinomial must be at least 3 characters"),
})


export default updateTestinomialSchema;