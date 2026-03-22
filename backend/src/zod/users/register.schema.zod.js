// import * as z from "zod";
import { z } from "zod";

const registerSchema = z.object({
    userName: z
        .string({ required_error: "Name is required" })
        .toLowerCase()
        .min(3, "Name must be at least 3 characters"),
    userEmail: z
        .string({ required_error: "Email is required" })
        .email()
        .toLowerCase(),
    userPassword: z
        .string({ required_error: "Password is required" })
        .min(4, "Password must be at least 4 characters"),
    phoneNumber: z
        .string()
        .optional(),
    userAddress: z
        .string({ required_error: "Address is required" }),
});

export default registerSchema;