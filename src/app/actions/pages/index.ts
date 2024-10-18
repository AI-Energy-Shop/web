import { client } from '@/apollo/client';
import PAGES_OPREATIONS from '@/graphql/page';

export async function getPages() {
  try {
    const res = await client.query<any>({
      query: PAGES_OPREATIONS.Queries.pages,
      fetchPolicy: 'no-cache',
    });

    return res.data;
  } catch (error: any) {
    console.error('GraphQL Query Error:', error);

    return error.message;
  }
}

export async function getPage(slug?: string) {
  try {
    const res = await client.query<any>({
      query: PAGES_OPREATIONS.Queries.getPage,
      fetchPolicy: 'no-cache',
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
