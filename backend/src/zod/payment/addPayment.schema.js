// import * as z from "zod";
import { z } from "zod";
import { CARD, ONLINE, CASH } from "../../../constants/paymentMethod.js";
import { PENDING, SUCCESS, FAILED } from "../../../constants/paymentStatus.js";

const paymentMethodSchema = z.enum([CARD, ONLINE, CASH], {
    errorMap: () => ({ message: "Methods not found/invalid." }),
});
const paymentStatusSchema = z.enum([PENDING, SUCCESS, FAILED], {
    errorMap: () => ({ message: "Status not found/invalid." }),
});

const paymentSchema = z.object({
    amount: z
        .number({ required_error: "Amount is required" })
        .refine(val => val > 0, { message: "Amount must be greater than 0" }),
    transactionId: z.string({ required_error: "categoryId is required" }),
    paymentId: z.string({ required_error: "categoryId is required" }),
    method: paymentMethodSchema,
    status: paymentStatusSchema,
});

export default paymentSchema;