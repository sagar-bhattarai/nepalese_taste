// import * as z from "zod";
import { z } from "zod";
import { PENDING, SUCCESS, FAILED } from "../../constants/paymentStatus.js";


const updatePaymentStatusSchema = z.enum([PENDING, SUCCESS, FAILED], {
    errorMap: () => ({ message: "Status not found/invalid." }),
});

const updatePaymentSchema = z.object({
    status: updatePaymentStatusSchema,
});

export default updatePaymentSchema;