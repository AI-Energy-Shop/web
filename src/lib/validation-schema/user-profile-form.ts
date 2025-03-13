import { z } from 'zod';

export const userProfileSchema = z.object({
  // firstName: z.string(),
  // middleName: z.string(),
  // lastName: z.string(),
  email: z.string().email(),
  username: z.string(),
  level: z.string(),
  companyName: z.string(),
  companyNumber: z.string(),
  phone: z.string(),
  telephone: z.string(),
  type: z.string(),
  address: z.string(),
  status: z.string(),
  odooId: z.string(),
});
