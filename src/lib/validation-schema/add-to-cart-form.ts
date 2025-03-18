import { z } from 'zod';

export const addToCartFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  model: z.string(),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  price: z.number(),
  image: z.string(),
  odoo_product_id: z
    .string()
    .min(1, { message: 'Odoo product id is required' }),
});
