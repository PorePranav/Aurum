import z from 'zod';

import { PaymentMethod } from '../../prisma/generated';

export const createExpenseSchema = z.object({
  date: z.coerce.date(),
  item: z
    .string()
    .trim()
    .min(2, 'Item should be of atleast 2 characters')
    .max(50, 'Item can be of max 50 characters'),
  paidTo: z
    .string()
    .min(2, 'Paid to should be of atleast 2 characters')
    .max(50, 'Paid to can be of max 50 characters'),
  description: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
  amount: z.number(),
  paymentMethod: z.enum(PaymentMethod).optional(),
  categoryId: z.cuid(),
});
