import { z } from "zod";

const addBrandSchema = z.object({
    brandName: z.string().min(3, "Name is required must be at least 3 characters"),
    brandDescription: z.string().optional(),
});

export default addBrandSchema;
