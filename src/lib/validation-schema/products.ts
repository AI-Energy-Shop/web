import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const addToCartFormSchema = z.object({
  id: z.string(),
  quantity: z.number().min(0), // Make sure this is number
});

export const addProductSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  description: z.string().nullable(),
  model: z.string().min(1, { message: 'Required' }),
  odoo_product_id: z.string().min(1, { message: 'Required' }),
  product_type: z.string().nullable(),
  vendor: z.string().nullable(),
  images: z.array(z.string()),
  files: z.array(z.string()),
  brand: z.string().nullable(),
  shipping: z.object({
    height: z.number(),
    width: z.number(),
    length: z.number(),
    weight: z.number(),
  }),
  price_lists: z
    .array(
      z.object({
        documentId: z.string().min(1, { message: 'Required' }).nullable(),
        price: z.number().min(1, { message: 'Required' }),
        sale_price: z.number().min(1, { message: 'Required' }),
        min_quantity: z.number().min(1, { message: 'Required' }),
        max_quantity: z.number().min(1, { message: 'Required' }),
        user_level: z.string().min(1, { message: 'Required' }),
      })
    )
    .nullable(),
  inventories: z.array(
    z.object({
      documentId: z.string().min(1, { message: 'Required' }).nullable(),
      location_code: z.string().min(1, { message: 'Required' }),
      quantity: z.number().min(1, { message: 'Required' }),
    })
  ),
  specifications: z.array(
    z.object({
      documentId: z.string().min(1, { message: 'Required' }).nullable(),
      key: z.string().min(1, { message: 'Required' }),
      value: z.string().min(1, { message: 'Required' }),
    })
  ),
  key_features: z.array(
    z.object({
      documentId: z.string().min(1, { message: 'Required' }).nullable(),
      feature: z.string().min(1, { message: 'Required' }),
    })
  ),
  releaseAt: z.string(),
});

export type AddProductFormData = z.infer<typeof addProductSchema>;

export const addProductResolver = zodResolver(addProductSchema);

export type PriceListFormData = z.infer<typeof addProductSchema>['price_lists'];
export type InventoryFormData = z.infer<typeof addProductSchema>['inventories'];
export type KeyFeatureFormData = z.infer<
  typeof addProductSchema
>['key_features'];
export type ShippingFormData = z.infer<typeof addProductSchema>['shipping'];
export type SpecificationFormData = z.infer<
  typeof addProductSchema
>['specifications'];

export type ImageFormData = z.infer<typeof addProductSchema>['images'];
export type FileFormData = z.infer<typeof addProductSchema>['files'];

// export const priceListSchema = z.object({
//   documentId: z.string().min(1, { message: 'Required' }),
//   price: z.number().min(1, { message: 'Required' }),
//   sale_price: z.number().min(1, { message: 'Required' }),
//   min_quantity: z.number().min(1, { message: 'Required' }),
//   max_quantity: z.number().min(1, { message: 'Required' }),
//   user_level: z.string().min(1, { message: 'Required' }),
// });

// export const priceListResolver = zodResolver(priceListSchema);

// export const inventorySchema = z.object({
//   documentId: z.string().min(1, { message: 'Required' }),
//   location_code: z.string().min(1, { message: 'Required' }),
//   quantity: z.number().min(1, { message: 'Required' }),
// });

// export type InventoryFormData = z.infer<typeof inventorySchema>;

// export const inventoryResolver = zodResolver(inventorySchema);

// export const specificationSchema = z.object({
//   documentId: z.string().min(1, { message: 'Required' }),
//   key: z.string().min(1, { message: 'Required' }),
//   value: z.string().min(1, { message: 'Required' }),
// });

// export type SpecificationFormData = z.infer<typeof specificationSchema>;

// export const specificationResolver = zodResolver(specificationSchema);

// export const keyFeatureSchema = z.object({
//   documentId: z.string().min(1, { message: 'Required' }),
//   feature: z.string().min(1, { message: 'Required' }),
// });

// export type KeyFeatureFormData = z.infer<typeof keyFeatureSchema>;

// export const keyFeatureResolver = zodResolver(keyFeatureSchema);
