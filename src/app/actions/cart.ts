'use server';

import { getClient } from '@/apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import { CartsQuery } from '@/lib/gql/graphql';
import { cookies } from 'next/headers';
const client = getClient();

export async function getCartItems(): Promise<CartsQuery> {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;
  try {
    const res = await client.query({
      query: CART_OPERATIONS.Query.carts,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return res.data;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}

export async function addToCart(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;
  const productId = formData.get('model') as string;

  const variables = {
    data: {
      title: formData.get('title') as string,
      price: Number(formData.get('price')), // Convert to number safely
      quantity: Number(formData.get('quantity')), // Convert to number safely
      model: productId,
      odoo_product_id: productId,
      image: formData.get('image') as string,
    },
  };

  try {
    const { data: cartData } = await client.query({
      query: CART_OPERATIONS.Query.carts,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: {
        filters: {
          item: {
            model: {
              eq: productId,
            },
          },
        },
      },
    });

    const cartItem = cartData?.carts?.find?.(
      (cart: any) => cart.item.odoo_product_id === productId
    );

    if (cartItem) {
      const res = await client.mutate({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        mutation: CART_OPERATIONS.Mutation.updateCart,
        variables: {
          documentId: cartItem.documentId,
          data: {
            title: cartItem.item.title,
            price: cartItem.item.price,
            quantity: cartItem.item.quantity + variables.data.quantity,
            odoo_product_id: cartItem.item.odoo_product_id,
            model: cartItem.item.model,
            image: cartItem.item.image,
          },
        },
      });

      if (res.errors) {
        return {
          success: false,
          error: res.errors[0].message,
        };
      }

      return {
        success: true,
        message: 'Item updated in cart',
      };
    }

    const res = await client.mutate({
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      mutation: CART_OPERATIONS.Mutation.addToCart,
      variables,
    });

    if (res.errors) {
      return {
        success: false,
        error: res.errors[0].message,
      };
    }

    return {
      success: true,
      message: 'Item added to cart',
    };

  } catch (error: any) {
    console.error('GraphQL Mutation Error:', error.message);
    return {
      error: error.message,
    };
  }
}
