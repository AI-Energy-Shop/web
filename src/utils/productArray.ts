import { Product } from '@/lib/types';

export const getProductSpecification = (
  products?: Product[],
  key?: string
): { id: string; name: string; value: string }[] => {
  return (
    products?.flatMap((product: any) => {
      const types = product.specification.find(
        (spec: { key: string; value: string }) => spec.key.includes(key || '')
      );

      return types
        ? [
            {
              id: product.documentId,
              name: types.value,
              value: types.value.toLowerCase(),
            },
          ]
        : [];
    }) || []
  );
};
