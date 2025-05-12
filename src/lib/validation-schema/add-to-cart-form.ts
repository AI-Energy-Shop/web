import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const addToCartSchema = z.object({
  id: z.string(),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export type AddToCartFormData = z.infer<typeof addToCartSchema>;

export const addToCartResolver = zodResolver(addToCartSchema);
