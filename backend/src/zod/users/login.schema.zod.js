import { z } from "zod";

const loginSchema = z.object({
  userEmail: z
    .string({ required_error: "Email is required" })
    .email(),

  userPassword: z
    .string({
      required_error: "Password is required"
    })
    .min(4, "Password must be at least 4 characters"),
});


export default loginSchema;