import { z } from 'zod';

export const updateUserStatusSchema = z.object({
  userId: z.string(),
  email: z.string(),
  accountStatus: z.string(),
  odooId: z.string(),
  userPricingLevel: z.string(),
});
