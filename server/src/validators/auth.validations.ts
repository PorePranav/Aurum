import z from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name should be of atleast 2 characters')
    .max(50, 'Name can be of at max 50 characters'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password should be of atleast 8 characters')
    .max(20, 'Password can be of at max 20 characters'),
  confirmPassword: z.string(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, 'Password should be of atleast 8 characters')
      .max(20, 'Password can be of at max 20 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
  });
