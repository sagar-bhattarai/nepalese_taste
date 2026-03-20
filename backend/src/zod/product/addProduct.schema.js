// import * as z from "zod";
import { z } from "zod";

const attributesSchema = z
    .record(
        z.string(),
        z.string().min(1, "Attribute value cannot be empty")
    )
    .refine(obj => Object.keys(obj).length > 0, {
        message: "At least one attribute is required",
    });

const productSchema = z.object({
    productName: z
        .string({ required_error: "productName is required" })
        .toLowerCase()
        .min(3, "productName must be at least 3 characters"),
    productDescription: z
        .string({ required_error: "productDescription is required" })
        .toLowerCase()
        .min(3, "productDescription must be at least 3 characters"),
    categoryId: z.string({ required_error: "categoryId is required" }),
    supplierId: z.string({ required_error: "supplierId is required" }),
    // attributes: attributesSchema,
    productStock: z
        .coerce.number({ required_error: "productStock is required" }),
    // .number({ required_error: "productStock is required" }),
    // .min(1, "productStock must be greater than 0"),
    productPrice: z
        .coerce.number({ required_error: "productPrice is required" }),
    // .number({ required_error: "productPrice is required" }),
    // .refine(val => val > 0, { message: "productPrice must be greater than 0" }),
    brand: z
        .string({ required_error: "brand is required" })
        .toLowerCase(),
    productWeight: z.string().optional(),
    productDimension: z.string().optional(),
    // productImage: z.string().optional(),

});

export default productSchema;