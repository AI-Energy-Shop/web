'use server';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
import {
  CreateCartMutation,
  CreateCartMutationVariables,
  DeleteCartMutation,
  DeleteCartMutationVariables,
  UpdateCartMutation,
  UpdateCartMutationVariables,
} from '@/lib/gql/graphql';
import { Auser } from '@/lib/types';

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

export const addToCartAction = async (
  formData: FormData
): Promise<{
  error?: string;
  data?: CreateCartMutation | null;
}> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const response = await client.mutate<
      CreateCartMutation,
      CreateCartMutationVariables
    >({
      mutation: CART_OPERATIONS.Mutation.createCart,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
      variables: {
        data: {
          product: formData.get('product') as string,
          quantity: Number(formData.get('quantity')),
          user: formData.get('user') as string,
        },
      },
    });

    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error('addToCartAction Error:', error.message);
    return {
      error: error.message,
    };
  }
};

export const updateCartItemAction = async (formData: FormData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const response = await client.mutate<
      UpdateCartMutation,
      UpdateCartMutationVariables
    >({
      mutation: CART_OPERATIONS.Mutation.updateCart,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
      variables: {
        documentId: formData.get('cartId') as string,
        data: {
          product: formData.get('product') as string,
          quantity: Number(formData.get('quantity')),
        },
      },
    });
    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error('updateCartItemAction Error:', error.message);
    return {
      error: error.message,
    };
  }
};

export const removeItemFromCartAction = async (documentId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const response = await client.mutate<
      DeleteCartMutation,
      DeleteCartMutationVariables
    >({
      mutation: CART_OPERATIONS.Mutation.deleteCart,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
      variables: {
        documentId: documentId,
      },
    });
    return {
      data: response.data,
    };
  } catch (error: any) {
    console.error('removeItemFromCartAction Error:', error.message);
    return {
      error: error.message,
    };
  }
};

export const updateCartProductQuantity = async (
  documentId: string,
  quantity: number
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  await client.mutate({
    mutation: CART_OPERATIONS.Mutation.updateQuantity,
    context: {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
    variables: {
      documentId,
      data: {
        quantity,
      },
    },
  });
};
export async function getCartProductQuantity() {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;
  const aUser: Auser = JSON.parse(cookieStore.get('a-user')?.value!);

  const res = await client.query({
    query: CART_OPERATIONS.Query.cartProductQuantity,
    fetchPolicy: 'network-only',
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    variables: {
      documentId: aUser.documentId,
    },
  });

  return res.data;
}
