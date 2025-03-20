'use server';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import CART_OPERATIONS from '@/graphql/cart';

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

export async function removeCartItem(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;

  try {
    const res = await client.mutate({
      mutation: CART_OPERATIONS.Mutation.removeFromCart,
      variables: {
        documentId: id,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    console.log(res);

    return res;
  } catch (error: any) {
    console.error('GraphQL Mutation Error:', error.message);
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
