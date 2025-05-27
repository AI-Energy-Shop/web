import { z } from 'zod';

export const addressSchema = z.object({
  title: z.string().min(1).min(1, { message: 'Required.' }),
  street1: z.string().min(1),
  street2: z.string(),
  city: z.string().min(1, { message: 'Required.' }),
  state: z.string(),
  country: z.string(),
  zip_code: z.string().min(1, { message: 'Required.' }),
  isActive: z.boolean(),
  mobile: z.string(),
  phone: z.string(),
});
