'use client';

import { GetStoreProductQuery } from '@/lib/gql/graphql';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import { useAppSelector } from '@/store/store';
import { RootState } from '@/store/store';
import { cn } from '@/lib/utils';

interface ShopProductStockQuantitiesProps {
  product: GetStoreProductQuery['getStoreProduct'];
}
const ShopProductStockQuantities = ({
  product,
}: ShopProductStockQuantitiesProps) => {
  const warehouse = useAppSelector(
    (state: RootState) => state.checkout.warehouseLocation
  );

  const melbourneStock = product?.inventory?.melbourne;
  const sydneyStock = product?.inventory?.sydney;
  const brisbaneStock = product?.inventory?.brisbane;

  return (
    <div className="grid grid-cols-7 grid-rows-2 gap-y-4 my-5">
      <div className="border border-black rounded-2xl p-2 flex justify-between items-center col-span-3">
        <div className="flex items-center">
          <CheckCircle2
            className={cn(
              'w-5 h-5 mr-1',
              warehouse?.name === 'melbourne' && 'text-green-500'
            )}
          />
          <span className="text-sm font-medium">Melbourne, VIC</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium">
            {melbourneStock && melbourneStock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="text-xs font-medium">{melbourneStock}</span>
        </div>
      </div>
      <div className="border border-black rounded-2xl p-2 flex justify-between items-center col-span-3 col-start-5">
        <div className="flex items-center">
          <CheckCircle2
            className={cn(
              'w-5 h-5 mr-1',
              warehouse?.name === 'sydney' && 'text-green-500'
            )}
          />
          <span className="text-sm font-medium">Sydney, NSW</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium">
            {sydneyStock && sydneyStock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="text-xs font-medium">{sydneyStock}</span>
        </div>
      </div>
      <div className="border border-black rounded-2xl p-2 flex justify-between items-center col-span-3 row-start-2 col-start-3">
        <div className="flex items-center">
          <CheckCircle2
            className={cn(
              'w-5 h-5 mr-1',
              warehouse?.name === 'brisbane' && 'text-green-500'
            )}
          />
          <span className="text-sm font-medium">Brisbane, QLD</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium">
            {brisbaneStock && brisbaneStock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="text-xs font-medium">{brisbaneStock}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopProductStockQuantities;
