import { z } from 'zod';

export const userProfileSchema = z.object({
  companyName: z.string(),
  companyNumber: z.string(),
  image: z.string().optional(),
  email: z.string().email(),
  username: z.string(),
  phone: z.string(),
  type: z.string(),
  address: z.string(),
  status: z.string(),
});
