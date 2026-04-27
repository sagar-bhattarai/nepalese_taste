import { z } from "zod";

const addFavouriteSchema = z.object({
    productId: z.string()
        .min(1, "Product ID is required")
        .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId")
});


export default addFavouriteSchema;