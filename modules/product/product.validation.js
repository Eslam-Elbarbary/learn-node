import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(255).optional(),
  price: z.number().positive(),
  category: z.string().min(2).max(100),
});

const updateProductSchema = z
  .object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(255).optional(),
    price: z.number().positive().optional(),
    category: z.string().min(2).max(100).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one product field is required",
  });

export { createProductSchema, updateProductSchema };