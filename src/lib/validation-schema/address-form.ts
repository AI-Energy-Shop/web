import { z } from 'zod';

export const addressSchema = z.object({
  name: z.string(),
  street: z.string(),
  locality: z.string(),
  state: z.string(),
  postCode: z.string(),
  country: z.string(),
  default: z.boolean(),
});
