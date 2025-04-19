'use server';
import { cookies } from 'next/headers';
import { getClient } from '@/apollo/client';
import COLLECTIONS_OPERATIONS from '@/graphql/collections';
import { CollectionsWithProductsQuery, CollectionsWithProductsQueryVariables } from '@/lib/gql/graphql';
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
    });

    return res.data;
  } catch (error: any) {
    return error.message;
  }
}
