import z from 'zod';
import { PaymentMethod } from '../generated/prisma';

export const createExpenseSchema = z.object({
  date: z.coerce.date(),
  item: z
    .string()
    .trim()
    .min(2, 'Item should be of atleast 2 characters')
    .max(50, 'Item can be of max 50 characters'),
  amount: z.number(),
  paymentMethod: z.enum(PaymentMethod).optional(),
  categoryId: z.cuid(),
});
