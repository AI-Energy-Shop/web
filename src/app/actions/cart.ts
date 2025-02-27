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
  const model = formData.get('model') as string;
  const quantity = Number(formData.get('quantity'));
  const title = formData.get('title') as string;
  const price = Number(formData.get('price'));
  const odoo_product_id = formData.get('odoo_product_id') as string;
  const image = formData.get('image') as string;

  const variables = {
    data: {
      title: title,
      price: price,
      quantity: quantity,
      model: model,
      odoo_product_id,
      image: image,
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
              eq: model,
            },
          },
        },
      },
    });

    const cartItem = cartData?.carts?.find?.(
      (cart: any) => cart.item.model === model
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
        message: 'Item updated in cart',
        data: {
          id: cartItem.documentId,
          name: cartItem.item.title,
          price: cartItem.item.price,
          quantity: cartItem.item.quantity + variables.data.quantity,
          image: cartItem.item.image,
        },
        success: true,
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
      data: {
        id: res.data?.addToCart?.documentId,
        name: title,
        price: price,
        quantity: quantity,
        image: image,
        model: model,
      },
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
