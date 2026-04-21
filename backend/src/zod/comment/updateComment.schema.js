import { z } from "zod";

const updateCommentSchema = z.object({
  text: z
    .string({
      required_error: "comment is required"
    })
    .min(1, "comment must be at least 1 characters"),
});


export default updateCommentSchema;