import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(2).max(150),
  description: z.string().max(1000).optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0).optional(),
  categoryId: z.uuid(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

const updateProductSchema = z
  .object({
    name: z.string().min(2).max(150).optional(),
    description: z.string().max(1000).optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().min(0).optional(),
    categoryId: z.uuid().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "at least one product field is required",
  });

export { createProductSchema, updateProductSchema };