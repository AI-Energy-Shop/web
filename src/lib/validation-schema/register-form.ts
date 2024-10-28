import { z } from 'zod';

export const registerUserSchema = z.object({
  firstName: z.string().min(1, { message: 'Required' }),
  middleName: z.string().min(1, { message: 'Required' }),
  lastName: z.string().min(1, { message: 'Required' }),
  businessName: z.string().min(1, { message: 'Required' }),
  userType: z.string().min(1, { message: 'Required' }),
  username: z.string().min(1, { message: 'Required' }),
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
