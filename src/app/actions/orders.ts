'use server';
import { getClient } from '@/apollo/client';
import {
  CreateOrderMutation,
  Enum_Order_Deliverystatus,
  Enum_Order_Fulfillmentstatus,
  OrderFiltersInput,
} from '@/lib/gql/graphql';
import { PaginationArg } from '@/lib/gql/graphql';
import { cookies } from 'next/headers';
import ORDER_OPERATIONS from '@/graphql/order';
import { CheckoutState } from '@/store/features/checkout';
import { ApolloQueryResult } from '@apollo/client';

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

interface CreateOrderProps {
  checkoutState: CheckoutState;
}

export const createOrder = async ({ checkoutState }: CreateOrderProps) => {
  let isSuccess: boolean = false;
  let res: ApolloQueryResult<CreateOrderMutation> | null = null;

  try {
    const cookieStore = cookies();
    const token = cookieStore.get('a-token')?.value;

    const lineItems = checkoutState.items.map((item) => {
      return {
        line: {
          quantity: item.quantity,
          title: item.product.name,
          odoo_product_id: item.product.odoo_product_id,
          model: item.product.model,
          image: item.product.images[0]?.url || '',
          productID: item.product.documentId,
          price: 123,
        },
      };
    });

    const result = await client.query({
      query: ORDER_OPERATIONS.Mutation.createOrder,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: {
        data: {
          deliveryNotes: checkoutState.deliveryNotes,
          orderNotes: checkoutState.orderNotes,
          deliveryStatus: Enum_Order_Deliverystatus.TrackingAdded,
          fulfillmentStatus: Enum_Order_Fulfillmentstatus.Unfulfilled,
          paymentMethod: checkoutState.paymentMethod,
          lineItems,
        },
      },
    });
    res = result;
    isSuccess = !result.error;
  } catch (error) {
    isSuccess = false;
    console.log(error);
  }

  if (isSuccess && res) {
    return { data: res.data.createOrder?.documentId, error: null };
  } else {
    return { data: null, error: 'Please try again.' };
  }
};
