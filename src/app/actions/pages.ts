'use server';

import { getClient } from '@/apollo/client';
import PAGES_OPREATIONS from '@/graphql/page';
import type { GetPageQuery } from '@/lib/types';

const client = getClient();

export async function getPages(): Promise<GetPageQuery[]> {
  try {
    const res = await client.query<GetPageQuery[]>({
      query: PAGES_OPREATIONS.Queries.pages,
    });

    return res.data;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}

export async function getPage(slug?: string): Promise<GetPageQuery> {
  try {
    const res = await client.query<GetPageQuery>({
      query: PAGES_OPREATIONS.Queries.getPage,
      variables: {
        slug: slug,
      },
    });

    return res.data;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}
