import { getClient } from '@/apollo/client';
import { OrderFiltersInput } from '@/lib/gql/graphql';
import { PaginationArg } from '@/lib/gql/graphql';
import { cookies } from 'next/headers';
import ORDER_OPERATIONS from '@/graphql/order';

const client = getClient();

export const orders = async (variables?: {
  filters: OrderFiltersInput;
  pagination: PaginationArg;
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get('a-token')?.value;
  const res = await client.query({
    query: ORDER_OPERATIONS.Query.orders,
    variables: variables,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return res;
};
