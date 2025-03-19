'use server';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import { AddToCartMutation } from '@/lib/gql/graphql';

const client = getClient();
export async function getCartItems() {
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

  const title = formData.get('title') as string;
  const model = formData.get('model') as string;
  const image = formData.get('image') as string;
  const price = Number(formData.get('price'));
  const quantity = Number(formData.get('quantity'));
  const odoo_product_id = formData.get('odoo_product_id') as string;

  console.log({ title, price, quantity, model, odoo_product_id, image, token });

  try {
    // const { data: cartData } = await client.query({
    //   query: CART_OPERATIONS.Query.carts,
    //   context: {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    //   variables: {
    //     filters: {
    //       item: {
    //         model: {
    //           eq: model,
    //         },
    //       },
    //     },
    //   },
    // });
    // const cartItem = cartData?.carts?.find?.(
    //   (cart: any) => cart.item.model === model
    // );
    // if (cartItem) {
    //   const res = await client.mutate({
    //     context: {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //     mutation: CART_OPERATIONS.Mutation.updateCart,
    //     variables: {
    //       documentId: cartItem.documentId,
    //       data: {
    //         title: cartItem.item.title,
    //         price: cartItem.item.price,
    //         quantity: cartItem.item.quantity + quantity,
    //         odoo_product_id: cartItem.item.odoo_product_id,
    //         model: cartItem.item.model,
    //         image: cartItem.item.image,
    //       },
    //     },
    //   });
    //   if (res.errors) {
    //     return {
    //       error: res.errors[0].message,
    //     };
    //   }
    //   return {
    //     message: 'Item updated in cart',
    //     data: {
    //       id: cartItem.documentId,
    //       name: cartItem.item.title,
    //       price: cartItem.item.price,
    //       quantity: cartItem.item.quantity + quantity,
    //       image: cartItem.item.image,
    //     },
    //   };
    // }

    if (!token) {
      throw new Error('Authentication required');
    }

    const res = await client.mutate({
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      mutation: CART_OPERATIONS.Mutation.addToCart,
      variables: {
        data: {
          title,
          price,
          quantity,
          model,
          odoo_product_id,
          image,
        },
      },
    });

    return res;
  } catch (error: any) {
    console.error('AddToCart Mutation Error:', error.message);
    return error.message;
  }
}

export async function testAddToCart(formData: FormData) {
  const title = formData.get('title') as string;
  const model = formData.get('model') as string;
  const quantity = Number(formData.get('quantity'));
  const price = Number(formData.get('price'));
  const image = formData.get('image') as string;
  const odoo_product_id = formData.get('odoo_product_id') as string;

  console.log('price:', price);
  console.log('quantity:', quantity);
  console.log('title:', title);
  console.log('model:', model);
  console.log('image:', image);
  console.log('odoo_product_id:', odoo_product_id);
}
