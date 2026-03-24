import { z } from "zod";

const attributesSchema = z
    .record(
        z.string(),
        z.string().min(1, "Attribute value cannot be empty").optional()
    )
    .refine(obj => Object.keys(obj).length > 0, {
        message: "At least one attribute is required",
    }).optional();

const updateProductSchema = z.object({
    productName: z
        .string()
        .toLowerCase()
        .min(3, "productName must be at least 3 characters").optional(),
    productDescription: z
        .string()
        .toLowerCase()
        .min(3, "productDescription must be at least 3 characters").optional(),
    // attributes: attributesSchema,
    categoryId: z.string({ required_error: "categoryId is required" }),
    productStock: z
        .coerce.number().optional(),
    productPrice: z
        .coerce.number({ required_error: "productPrice is required" }),
    oldPrice: z.coerce.number().optional(),
    // isActive: z.boolean().optional(),
    isActive: z.string().optional(),
    brand: z
        .string({ required_error: "brand is required" })
        .toLowerCase(),
    productWeight: z.string().optional(),
    productDimension: z.string().optional(),
    // productImage: z.string().optional(),

});

export default updateProductSchema;
