'use server';

import { getClient } from '@/apollo/client';
import PAGES_OPREATIONS from '@/graphql/page';
import { PagesQuery } from '@/lib/gql/graphql';
import type { GetPageQuery } from '@/lib/types';
import { FetchResult } from '@apollo/client';

const client = getClient();

export async function getPages(): Promise<FetchResult<PagesQuery>> {
  try {
    const res = await client.query<PagesQuery>({
      query: PAGES_OPREATIONS.Queries.pages,
    });

    return res;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}

export async function getPage(
  slug?: string
): Promise<FetchResult<GetPageQuery>> {
  try {
    const res = await client.query<GetPageQuery>({
      query: PAGES_OPREATIONS.Queries.getPage,
      fetchPolicy: 'no-cache',
      variables: {
        slug: slug,
      },
    });

    return res;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}
