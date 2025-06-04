import { CartsQuery } from '@/lib/gql/graphql';

export const checkShippingEligibility = (carts: CartsQuery['carts']) => {
  return carts.every((cart) => {
    return (cart?.quantity || 0) <= (cart?.product?.maxQuantity || 0);
  });
};
