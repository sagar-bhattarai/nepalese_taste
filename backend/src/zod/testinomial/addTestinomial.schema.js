import { z } from "zod";

const addTestinomialSchema = z.object({
  postId:z.string(),
  text: z
    .string({
      required_error: "testinomial is required"
    })
    .min(1, "testinomial must be at least 1 characters"),
});


export default addTestinomialSchema;