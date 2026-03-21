import { z } from "zod";

const addCategorySchema = z.object({
    categoryName: z.string().min(3, "Name is required must be at least 3 characters"),
    categoryDescription: z.string().optional(),
});

export default addCategorySchema;
