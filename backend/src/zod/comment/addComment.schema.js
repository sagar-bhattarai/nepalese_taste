import { z } from "zod";

const addCommentSchema = z.object({
  postId:z.string(),
  text: z
    .string({
      required_error: "comment is required"
    })
    .min(1, "comment must be at least 1 characters"),
    parentId:z.string().nullable()
});


export default addCommentSchema;