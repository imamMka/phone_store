import { z } from "zod";

export const createProductSchema = z.object({
  user_id: z.coerce.number().int().positive(),
  name: z.string().min(2, "Product name must be at least 2 characters long"),
  description: z.string().min(10, "Product description must be at least 10 characters long"),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0)
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided for update",
  });