import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.coerce.number().int().positive(),
  requestFrom: z.string().min(1),
  totalPrice: z.coerce.number().positive(),
//   name: z.string().min(1),
//   email: z.string().email(),
//   phone: z.string().min(10),
});

const addOrderSchema = z.object({
  requestData: z.array(orderItemSchema).min(1, "At least one item required"),
});


export default addOrderSchema;