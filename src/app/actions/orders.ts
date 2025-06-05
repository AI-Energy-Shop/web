'use server';
import { getClient } from '@/apollo/client';
import {
  CreateOrderMutation,
  Enum_Order_Deliverystatus,
  Enum_Order_Fulfillmentstatus,
  Enum_Order_Paymentstatus,
  OrderFiltersInput,
} from '@/lib/gql/graphql';
import { PaginationArg } from '@/lib/gql/graphql';
import { cookies } from 'next/headers';
import ORDER_OPERATIONS from '@/graphql/order';
import { CheckoutState } from '@/store/features/checkout';
import { ApolloQueryResult } from '@apollo/client';
import { Auser } from '@/lib/types';

const client = getClient();

export const orders = async (variables?: {
  filters: OrderFiltersInput;
  pagination: PaginationArg;
}) => {
  const cookieStore = await cookies();
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

interface LineItems {
  line: {
    quantity: number;
    title: string;
    odoo_product_id: string;
    model: string | undefined;
    image: string;
    productID: string | undefined;
    price: number;
  };
}

interface CreateOrderProps {
  lineItems: LineItems[];
  checkoutState: CheckoutState;
}

export const createOrder = async ({
  checkoutState,
  lineItems,
}: CreateOrderProps) => {
  let isSuccess: boolean = false;
  let res: ApolloQueryResult<CreateOrderMutation> | null = null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('a-token')?.value;
    const aUser: Auser = JSON.parse(cookieStore.get('a-user')?.value!);

    const result = await client.query({
      query: ORDER_OPERATIONS.Mutation.createOrder,
      fetchPolicy: 'no-cache',
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: {
        // TODO ROI NO TOTAL FIELD YET
        data: {
          deliveryNotes: checkoutState.deliveryNotes,
          orderNotes: checkoutState.orderNotes,
          pickupNotes: checkoutState.pickUpNotes,
          deliveryStatus: Enum_Order_Deliverystatus.TrackingAdded,
          fulfillmentStatus: Enum_Order_Fulfillmentstatus.Unfulfilled,
          paymentMethod: checkoutState.paymentMethod,
          shippingType: checkoutState?.shippingType,
          stripeCheckoutSession: checkoutState?.card?.stripePaymentMethodID,
          paymentStatus: Enum_Order_Paymentstatus.Pending,
          shippingAddress: {
            city: checkoutState?.shippingAddress?.city,
            country: checkoutState?.shippingAddress?.country,
            odoo_address_id: checkoutState?.shippingAddress?.odoo_address_id,
            postcode: checkoutState?.shippingAddress?.zip_code,
            state_territory: checkoutState?.shippingAddress?.state,
            street: `${checkoutState?.shippingAddress?.street1} ${checkoutState?.shippingAddress?.street2}`,
          },
          // TODO ROI UPDATE THE ID OF WAREHOUSE LOCATION AND SYNC IT TO THE ODOO WAREHOUSE ID
          warehouseLocation: {
            address: {
              city: checkoutState?.warehouseLocation?.address?.suburb,
              postcode: checkoutState?.warehouseLocation?.address?.postcode,
              street: `${checkoutState?.warehouseLocation?.address?.unit} ${checkoutState?.warehouseLocation?.address?.state}`,
              state: checkoutState?.warehouseLocation?.address?.state,
            },
            odoo_warehouse_id: checkoutState?.warehouseLocation?.id.toString(),
            title: checkoutState?.warehouseLocation?.title,
          },
          pickupOption: {
            date: checkoutState?.pickupOptions?.date
              ? new Date(checkoutState?.pickupOptions.date)
              : undefined,
            estimatedArraivalTime:
              checkoutState?.pickupOptions?.estimatedArrivalTime,
          },
          lineItems,
          user: aUser.documentId,
          deliveryOption: {
            requestedDeliveryDate: checkoutState?.deliveryOptions?.date
              ? new Date(checkoutState?.deliveryOptions?.date)
                  .toISOString()
                  .split('T')[0]
              : undefined,
            type: checkoutState?.shippingType,
            shipping: {
              carrierAccountId:
                checkoutState?.deliveryOptions?.macshipData?.carrierAccountId,
              carrierId: checkoutState?.deliveryOptions?.macshipData?.carrierId,
              carrierServiceId:
                checkoutState?.deliveryOptions?.macshipData?.carrierServiceId,
              companyCarrierAccountId:
                checkoutState?.deliveryOptions?.macshipData
                  ?.companyCarrierAccountId,
              companyId: checkoutState?.deliveryOptions?.macshipData?.companyId,
              display: {
                carrierDisplayName:
                  checkoutState?.deliveryOptions?.macshipData?.displayData
                    ?.carrierServiceDisplayName,
                carrierServiceDisplayName:
                  checkoutState?.deliveryOptions?.macshipData?.displayData
                    ?.carrierDisplayName,
                eta: checkoutState?.deliveryOptions?.macshipData?.displayData
                  ?.eta,
                totalSellBeforeTax:
                  checkoutState?.deliveryOptions?.macshipData?.displayData
                    ?.totalSellBeforeTax,
                totalSellPrice:
                  checkoutState?.deliveryOptions?.macshipData?.displayData
                    ?.totalSellPrice,
                totalWeight:
                  checkoutState?.deliveryOptions?.macshipData?.displayData
                    ?.totalWeight,
              },
            },
          },
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
