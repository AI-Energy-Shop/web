import { calculateDeliveryPricing } from '@/app/actions/macship';
import { Routes } from '@/lib/routes.types';
import { useEffect, useState } from 'react';

const useCalculateDeliveryPricing = (suburb: string, postCode: string) => {
  const [data, setData] = useState<Routes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!suburb || !postCode) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData([]);
        setError('');

        const { error, data } = await calculateDeliveryPricing({
          fromLocation: {
            suburb: 'Brookvale',
            postcode: '2100',
          },
          toLocation: {
            suburb: suburb,
            postcode: postCode,
          },
        });

        if (error) {
          setError('Ensure your city and ZIP code are correct.');
        }

        if (data) {
          setData(data);
        }
      } catch (error) {
        setError('Internal Server Error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [suburb, postCode]);

  return { data, isLoading, error };
};

export default useCalculateDeliveryPricing;
