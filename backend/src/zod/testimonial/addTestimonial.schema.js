import { z } from "zod";

const addTestinomialSchema = z.object({
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
});


export default addTestinomialSchema;