import { ProductsQuery } from '@/lib/gql/graphql';

export const getProductSpecification = (
  products?: ProductsQuery['products'][],
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
