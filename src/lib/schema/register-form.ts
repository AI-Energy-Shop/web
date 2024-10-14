import { z } from 'zod';

export const RegisterUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(64, { message: 'Password must be no more than 64 characters long' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number',
    }),
  confirmPassword: z.string(),
});
