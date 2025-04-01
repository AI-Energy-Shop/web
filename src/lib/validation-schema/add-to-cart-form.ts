import { z } from 'zod';

export const addToCartFormSchema = z.object({
  id: z.string(),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});
