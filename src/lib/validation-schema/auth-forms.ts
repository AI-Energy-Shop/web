import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const registerUserSchema = z.object({
  businessName: z.string().min(1, { message: 'Required' }),
  businessNumber: z.string().min(1, { message: 'Required' }),
  businessType: z.string().min(1, { message: 'Required' }),
  username: z.string().min(1, { message: 'Required' }),
  email: z.string().email(),
  phone: z.string().min(1, { message: 'Required' }),
  street1: z.string().min(1, { message: 'Required' }),
  street2: z.string().min(1, { message: 'Required' }),
  city: z.string().min(1, { message: 'Required' }),
  state: z.string().min(1, { message: 'Required' }),
  zipCode: z.string().min(1, { message: 'Required' }),
  country: z.string().min(1, { message: 'Required' }),
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

export type LoginFormData = z.infer<typeof loginUserSchema>;

export const loginResolver = zodResolver(loginUserSchema);

export type RegisterFormData = z.infer<typeof registerUserSchema>;

export const registerResolver = zodResolver(registerUserSchema);
