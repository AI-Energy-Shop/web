import { z } from 'zod';

export const addressSchema = z.object({
  title: z.string().min(1),
  street1: z.string().min(1),
  street2: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip_code: z.string(),
  isActive: z.boolean(),
  mobile: z.string(),
  phone: z.string(),
});
