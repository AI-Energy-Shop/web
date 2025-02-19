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

export async function addToCart(formData: FormData) {
  const user = 'eufllc2m0malt3oiiusgk5hc';
  const productId = formData.get('model') as string;

  const variables = {
    data: {
      user: 'eufllc2m0malt3oiiusgk5hc',
      item: {
        title: formData.get('title') as string,
        price: Number(formData.get('price')), // Convert to number safely
        quantity: Number(formData.get('quantity')), // Convert to number safely
        model: productId,
        odoo_product_id: productId,
        image: formData.get('image') as string,
      },
    },
  };

  try {
    const { data: cartData } = await client.query({
      query: CART_OPERATIONS.Query.carts,
      fetchPolicy: 'no-cache',
      variables: {
        filters: {
          item: {
            odoo_product_id: {
              eq: productId,
            },
          },
          user: {
            documentId: {
              eq: user,
            },
          },
        },
      },
    });

    const cartItem = cartData?.carts?.find?.(
      (cart: any) => cart.item.odoo_product_id === productId
    );
    console.log('CART ITEM: ', variables);
    if (cartItem) {
      console.log('UPDATE CART');
      const res = await client.mutate({
        mutation: CART_OPERATIONS.Mutation.updateCart,
        variables: {
          documentId: cartItem.documentId,
          data: {
            item: {
              title: cartItem.item.title,
              price: cartItem.item.price,
              quantity: cartItem.item.quantity + variables.data.item.quantity,
              odoo_product_id: cartItem.item.odoo_product_id,
              reference_id: cartItem.item.model,
              image: cartItem.item.image,
            },
          },
        },
      });

      return res;
    }

    const res = await client.mutate({
      mutation: CART_OPERATIONS.Mutation.addToCart,
      variables: variables,
    });

    return res;
  } catch (error: any) {
    console.log('VARIABLES: ', variables);
    console.error('GraphQL Mutation Error:', error);

    return error.message;
  }
}
