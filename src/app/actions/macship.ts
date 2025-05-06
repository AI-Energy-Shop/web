'use server';

import { Routes } from '@/lib/routes.types';

interface calculateDeliveryPricingProps {
  fromLocation: {
    suburb: string;
    postcode: string;
  };
  toLocation: {
    suburb: string;
    postcode: string;
  };
}

export const calculateDeliveryPricing = async (
  args: calculateDeliveryPricingProps
) => {
  const isAddressValid = await checkIfSuburbIsValid(
    args.toLocation.suburb,
    args.toLocation.postcode
  );

  if (!isAddressValid) {
    return { data: null, error: true };
  }

  const response = await fetch(
    'https://live.machship.com/apiv2/routes/returnroutes',
    {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: 'KTWYUqgxr0auQd2dkcOMiwmyXORiuimUGg8IW9jrEdAw',
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
        items: [
          {
            name: 'Wireless Headphones',
            sku: 'HP-X200',
            quantity: 1,
            weight: 1.5,
            length: 25,
            width: 18,
            height: 10,
          },
        ],
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

  return { data: data.object.routes as Routes[], error: null };
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
