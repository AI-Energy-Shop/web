import { calculateDeliveryPricing } from '@/app/actions/macship';
import { Routes } from '@/lib/routes.types';
import { useEffect, useState, useRef } from 'react';

const useCalculateDeliveryPricing = (suburb: string, postCode: string) => {
  const [data, setData] = useState<Routes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timer on each change
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Return early if no input values
    if (!suburb && !postCode) {
      return;
    }

    // Set up the debounced fetch
    timerRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
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
          setError('Please change your input');
        }

        if (data) {
          setData(data);
        }
      } catch (error) {
        setError('Internal Server Error');
      } finally {
        setIsLoading(false);
      }
    }, 1000); // 1 second debounce

    // Cleanup function to clear the timer if component unmounts or dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [postCode, suburb]);

  return { data, isLoading, error };
};

export default useCalculateDeliveryPricing;
