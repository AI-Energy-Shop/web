import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const addProductSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().min(1, { message: 'Required' }),
  model: z.string().min(1, { message: 'Required' }),
  odoo_product_id: z.string().min(1, { message: 'Required' }),
  product_type: z.string().min(1, { message: 'Required' }),
  vendor: z.string().min(1, { message: 'Required' }),
  images: z.array(z.string()).min(1, { message: 'Required' }),
  files: z.array(z.string()).min(1, { message: 'Required' }),
  // key_features: z.array(z.string()).min(1, { message: 'Required' }),
  price_lists: z.array(
    z.object({
      documentId: z.string().min(1, { message: 'Required' }),
      price: z.number().min(1, { message: 'Required' }),
      sale_price: z.number().min(1, { message: 'Required' }),
      min_quantity: z.number().min(1, { message: 'Required' }),
      max_quantity: z.number().min(1, { message: 'Required' }),
      user_level: z.string().min(1, { message: 'Required' }),
    })
  ),
  inventories: z
    .array(
      z.object({
        documentId: z.string().min(1, { message: 'Required' }),
        location_code: z.string().min(1, { message: 'Required' }),
        quantity: z.number().min(1, { message: 'Required' }),
      })
    )
    .min(1, { message: 'Required' }),
  specifications: z.array(
    z.object({
      documentId: z.string().min(1, { message: 'Required' }),
      key: z.string().min(1, { message: 'Required' }),
      value: z.string().min(1, { message: 'Required' }),
    })
  ),
  brands: z.string().min(1, { message: 'Required' }),
  tags: z.string().min(1, { message: 'Required' }),
  publishedAt: z.string().min(1, { message: 'Required' }).nullable(),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;

export const addProductResolver = zodResolver(addProductSchema);

export const priceListSchema = z.object({
  documentId: z.string().min(1, { message: 'Required' }),
  price: z.number().min(1, { message: 'Required' }),
  sale_price: z.number().min(1, { message: 'Required' }),
  min_quantity: z.number().min(1, { message: 'Required' }),
  max_quantity: z.number().min(1, { message: 'Required' }),
  user_level: z.string().min(1, { message: 'Required' }),
});

export type PriceListFormData = z.infer<typeof priceListSchema>;

export const priceListResolver = zodResolver(priceListSchema);

export const inventorySchema = z.object({
  documentId: z.string().min(1, { message: 'Required' }),
  location_code: z.string().min(1, { message: 'Required' }),
  quantity: z.number().min(1, { message: 'Required' }),
});

export type InventoryFormData = z.infer<typeof inventorySchema>;

export const inventoryResolver = zodResolver(inventorySchema);

export const specificationSchema = z.object({
  documentId: z.string().min(1, { message: 'Required' }),
  key: z.string().min(1, { message: 'Required' }),
  value: z.string().min(1, { message: 'Required' }),
});

export type SpecificationFormData = z.infer<typeof specificationSchema>;

export const specificationResolver = zodResolver(specificationSchema);
