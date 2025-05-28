import { calculateDeliveryPricing } from '@/app/actions/macship';
import { Routes } from '@/lib/routes.types';
import { useEffect, useState } from 'react';
import { useCheckout } from './useCheckout';
import { CartsQuery } from '@/lib/gql/graphql';

const DEBOUNCE_DELAY = 1000;

export const useCalculateDeliveryPricing = (
  suburb: string,
  postCode: string,
  carts: CartsQuery['carts']
) => {
  const [data, setData] = useState<Routes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { warehouseLocation } = useCheckout();

  useEffect(() => {
    if (!suburb || !postCode) return;

    const handler = setTimeout(async () => {
      try {
        setIsLoading(true);
        setData([]);
        setError('');

        const { error, data } = await calculateDeliveryPricing({
          fromLocation: {
            suburb: warehouseLocation.address.suburb,
            postcode: warehouseLocation.address.postcode,
          },
          toLocation: {
            suburb,
            postcode: postCode,
          },
          carts,
        });

        if (error) {
          setError('Ensure your city and ZIP code are correct.');
        } else if (data) {
          setData(data);
        }
      } catch (err) {
        setError('Internal Server Error');
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler); // Cancel on cleanup to debounce
    };
  }, [
    suburb,
    postCode,
    carts,
    warehouseLocation.address.suburb,
    warehouseLocation.address.postcode,
  ]);

  return { data, isLoading, error };
};

export default useCalculateDeliveryPricing;
