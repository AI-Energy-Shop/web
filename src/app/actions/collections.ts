'use server';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import COLLECTIONS_OPERATIONS from '@/graphql/collections';
import {
  CollectionsWithProductsQuery,
  CollectionsWithProductsQueryVariables,
} from '@/lib/gql/graphql';
import { ApolloError } from '@apollo/client';
const client = getClient();

export async function getCollectionWithProducts(
  variables: CollectionsWithProductsQueryVariables
): Promise<CollectionsWithProductsQuery> {
  const cookieStore = await cookies();
  const token = cookieStore.get('a-token')?.value;

  try {
    const res = await client.query<CollectionsWithProductsQuery>({
      query: COLLECTIONS_OPERATIONS.Query.collectionsWithProducts,
      fetchPolicy: 'no-cache',
      variables: variables,
      context: token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined,
    });

    return res.data;
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
    }

    if (error instanceof ApolloError) {
      console.log(error.cause?.cause);
    }

    return error.message;
  }
}
