import { z } from "zod";

const orderItemSchema = z.array(
  z.object({
    productId: z
      .string()
      .min(1, "Product ID is required")
      .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId"),
    quantity: z
      .number()
      .int("Quantity must be an integer")
      .positive("Quantity must be greater than 0"),
    price: z
      .number()
      .int("Price must be an integer")
      .positive("Price must be greater than 0"),
  }),
).min(1, "At least one order item is required");


const addOrderSchema = z.object({
  orderItem: orderItemSchema,
  requestedFrom: z.string().min(4),
  totalPrice: z
    .number()
    .positive("Total price must be greater than 0"),
  shippingAddress: z
    .string()
    .min(10, "Shipping address is too short"),
});

export default addOrderSchema;