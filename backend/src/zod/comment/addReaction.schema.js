import { z } from "zod";

const addReactionSchema = z.object({
  type: z
    .string({
      required_error: "reaction type is required"
    }),
  commentId: z.string({
    required_error: "reaction's commentId is required"
  })
});


export default addReactionSchema;