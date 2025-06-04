'use server';

import { Routes } from '@/lib/routes.types';
import { CartsQuery } from '@/lib/gql/graphql';

interface calculateDeliveryPricingProps {
  fromLocation: {
    suburb: string;
    postcode: string;
  };
  toLocation: {
    suburb: string;
    postcode: string;
  };
  carts: CartsQuery['carts'];
}

export const calculateDeliveryPricing = async (
  args: calculateDeliveryPricingProps
) => {
  const { toLocation, carts } = args;

  const isAddressValid = await checkIfSuburbIsValid(
    toLocation.suburb,
    toLocation.postcode
  );

  if (!isAddressValid) {
    return { data: null, error: true };
  }

  const cartItems = carts.map((product) => {
    return {
      name: product?.product?.name,
      sku: product?.product?.model,
      quantity: product?.quantity || 0,
      weight: product?.product?.shipping?.weight || 0,
      length: product?.product?.shipping?.length || 0,
      width: product?.product?.shipping?.width || 0,
      height: product?.product?.shipping?.height || 0,
    };
  });

  const response = await fetch(
    'https://live.machship.com/apiv2/routes/returnroutes',
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: process.env.MACSHIP_API_KEY as string,
      },
      body: JSON.stringify({
        fromLocation: {
          suburb: args.fromLocation.suburb,
          postcode: args.fromLocation.postcode,
        },
        toLocation: {
          suburb: args.toLocation.suburb,
          postcode: args.toLocation.postcode,
        },
        items: cartItems,
      }),
    }
  );

  if (!response.ok) {
    return { data: null, error: true };
  }

  const data = await response.json();

  if (data.error) {
    return { data: null, error: true };
  }

  return { data: data?.object?.routes as Routes[], error: null };
};

export const checkIfSuburbIsValid = async (
  suburb: string,
  postcode: string
) => {
  try {
    const response = await fetch(
      'https://live.machship.com/apiv2/locations/returnLocations',
      {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: process.env.MACSHIP_API_KEY as string,
        },
        body: JSON.stringify({
          rawLocations: [
            {
              suburb,
              postcode,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (!data.object) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
