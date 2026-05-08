import { z } from "zod";

const addReactionSchema = z.object({
  type: z
    .string({
      required_error: "reaction type is required"
    }),
  testinomialId: z.string({
    required_error: "reaction's testinomialId is required"
  })
});


export default addReactionSchema;