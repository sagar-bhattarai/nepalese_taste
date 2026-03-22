import { z } from "zod";

const resetSchema = z.object({
  newPassword: z
    .string({ required_error: "New Password is required" })
    .min(4, "New Password must be at least 4 characters"),

  confirmPassword: z
    .string({
      required_error: "Confirm Password is required"
    })
    .min(4, "Confirm Password must be at least 4 characters"),
});


export default resetSchema;