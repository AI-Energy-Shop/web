import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const addToCartFormSchema = z.object({
  id: z.string(),
  quantity: z.number().min(0), // Make sure this is number
});

const priceItemSchema = z
  .object({
    documentId: z.string().min(1, { message: 'Required' }).nullable(),
    price: z.number().min(0, { message: 'Required' }),
    comparePrice: z.number().nullable(),
    min_quantity: z.number().min(1, { message: 'Required' }).default(1),
    max_quantity: z.number().nullable(),
    user_level: z.string().min(1, { message: 'Required' }),
  })
  .refine(
    (data) =>
      data.max_quantity == null || data.max_quantity > data.min_quantity,
    {
      message: 'Maximum quantity must be greater than Minimum Quantity',
      path: ['max_quantity'], // This points the error to comparePrice
    }
  )
  .refine(
    (data) => data.comparePrice == null || data.comparePrice < data.price,
    {
      message: 'Reduced price must be less than standard price',
      path: ['comparePrice'], // This points the error to comparePrice
    }
  );

const inventoryItemSchema = z.object({
  documentId: z.string().nullable(),
  melbourne: z.number().min(0, { message: 'Required' }),
  sydney: z.number().min(0, { message: 'Required' }),
  brisbane: z.number().min(0, { message: 'Required' }),
});

const specificationItemSchema = z.object({
  documentId: z.string().min(1, { message: 'Required' }).nullable(),
  key: z.string().min(1, { message: 'Required' }),
  value: z.string().min(1, { message: 'Required' }),
});

const featureItemSchema = z.object({
  documentId: z.string().min(1, { message: 'Required' }).nullable(),
  feature: z.string().min(1, { message: 'Required' }),
});

const shippingSchema = z
  .object({
    documentId: z.string().nullable(),
    height: z.number(),
    width: z.number(),
    length: z.number(),
    weight: z.number(),
  })
  .nullable();

export const addProductSchema = z.object({
  handle: z.string().min(1, { message: 'Required' }),
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().nullable(),
  model: z.string().nullable(),
  odoo_product_id: z.string().min(1, { message: 'Required' }),
  odoo_product_name: z.string().nullable(),
  product_type: z.string().nullable(),
  status: z.string(),
  images: z.array(z.string()),
  files: z.array(z.string()),
  brand: z.string().nullable(),
  collections: z.array(z.string()).nullable(),
  shipping: shippingSchema,
  price_lists: z.array(priceItemSchema).nullable(),
  inventory: inventoryItemSchema.nullable(),
  specifications: z.array(specificationItemSchema).nullable(),
  key_features: z.array(featureItemSchema).nullable(),
  maxQuantity: z.number().nullable(),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;

export const addProductResolver = zodResolver(addProductSchema);

export type PriceListFormData = z.infer<typeof addProductSchema>['price_lists'];
export type InventoryFormData = z.infer<typeof addProductSchema>['inventory'];
export type KeyFeatureFormData = z.infer<
  typeof addProductSchema
>['key_features'];
export type ShippingFormData = z.infer<typeof addProductSchema>['shipping'];
export type SpecificationFormData = z.infer<
  typeof addProductSchema
>['specifications'];

export type ImageFormData = z.infer<typeof addProductSchema>['images'];
export type FileFormData = z.infer<typeof addProductSchema>['files'];
