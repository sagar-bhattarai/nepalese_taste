import { z } from "zod";

//  Product Data
const productDataSchema = z.object({
    productName: z.string({ required_error: "productName is required" }).min(3, "productName must be at least 3 characters"),
    productDescription: z.string({ required_error: "productDescription is required" }).min(3, "productDescription must be at least 3 characters"),
    brand: z.string({ required_error: "brand is required" }).toLowerCase(),
});

//  Variants Data
const variantsDataSchema = z.object({
    variantId: z.string({ required_error: "variantId is required" }),
    attributes: z
        .record(z.string(),
            z.string().min(1, "Attribute value cannot be empty"))
        .refine(obj => Object.keys(obj).length > 0, {
            message: "At least one attribute is required",
        }),
});

//  Vendor Listings Data
const vendorListingsDataSchema = z.object({
    listingId: z.string({ required_error: "listingId is required" }),
    productPrice: z.number({ required_error: "productPrice is required" }).min(1, "productPrice must be > 0"),
    productStock: z.number({ required_error: "productStock is required" }).min(1, "productStock must be > 0"),
});


const updateProductSchema = z.object({
    productData: productDataSchema,
    // variantsData: variantsDataSchema,
    // vendorListingsData: vendorListingsDataSchema,
});

export default updateProductSchema;
