import z from 'zod';

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Category name should have atleast 2 characters')
    .max(20, 'Category name can be of max 50 characters'),
  icon: z.url().optional(),
  color: z.string().trim().optional(),
});
