'use server';

import { getClient } from '@/apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import { CartsQuery } from '@/lib/gql/graphql';

const client = getClient();

export async function getCartItems() {
  try {
    const res = await client.query({
      query: CART_OPERATIONS.Query.cartItems,
      fetchPolicy: 'no-cache',
    });

    console.log(res.data);

    return res.data;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}
