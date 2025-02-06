'use server';

import { getClient } from '@/apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import { CartsQuery } from '@/lib/gql/graphql';

const client = getClient();

export async function getCartItems(): Promise<CartsQuery> {
  try {
    const res = await client.query({
      query: CART_OPERATIONS.Query.carts,
      fetchPolicy: 'no-cache',
    });

    return res.data;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}
