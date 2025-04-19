'use server';
import PRODUCT_OPERATIONS from '@/graphql/products';
import { getClient } from '@/apollo/client';
import { FetchResult } from '@apollo/client';
import { cookies } from 'next/headers';
import {
  CreateProductMutation,
  CustomProductUpdateMutationVariables,
  CreateProductMutationVariables,
  ProductsQuery,
  ProductQuery,
  PaginationArg,
  ProductFiltersInput,
} from '@/lib/gql/graphql';

const client = getClient();

export const product = async (id: string): Promise<FetchResult<ProductQuery>> => {
  try {
    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.product,
      fetchPolicy: 'no-cache',
      variables: {
        documentId: id,
      },
    });

    return res;
  } catch (error: any) {
    console.error('ERROR FETCHING PRODUCT:', error);
    return error;
  }
};

export const products = async (variables?: {
  filters: ProductFiltersInput;
  pagination: PaginationArg;
}): Promise<FetchResult<ProductsQuery>> => {
  try {
    const res = await client.query({
      query: PRODUCT_OPERATIONS.Query.products,
      fetchPolicy: 'no-cache',
      variables: variables,
    });

    return res;
  } catch (error: any) {
    console.error("ERROR product's:", error.message);
    return error;
  }
};

export const createProduct = async (
  variables: CreateProductMutationVariables
): Promise<FetchResult<CreateProductMutation>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.createProduct,
      variables: variables,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    if (res.data === null) {
      throw new Error('Failed to create product');
    }

    return res;
  } catch (error: any) {
    throw error;
  }
};

export const updateProduct = async (variables: CustomProductUpdateMutationVariables) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');
  try {
    const res = await client.mutate({
      mutation: PRODUCT_OPERATIONS.Mutation.updateProduct,
      variables: variables,
      context: {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      },
    });

    if (res?.errors) {
      return res;
    }

    return res;
  } catch (error: any) {
    console.log('ERROR updating product:', error.message);
    return error;
  }
};

export const frontPageGetProduct = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token');

  const res = await client.query({
    query: PRODUCT_OPERATIONS.Query.product,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    },
    variables: {
      documentId: id,
    },
  });

  return res;
};
