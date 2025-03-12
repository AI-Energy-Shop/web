import { z } from 'zod';

export const userProfileSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  level: z.string(),
  status: z.string(),
  phone: z.string(),
  odooId: z.string(),
  type: z.string(),
  company: z.string(),
  companyNumber: z.string(),
  address: z.string(),
});
