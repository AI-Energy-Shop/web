import { ProductQuery } from '@/lib/gql/graphql';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';

interface ShopProductStockQuantitiesProps {
  product: ProductQuery['product'];
}
const ShopProductStockQuantities = ({
  product,
}: ShopProductStockQuantitiesProps) => {
  const getProductInventoryByLocation = (location: string) => {
    const inventory = product?.inventories?.find(
      (inventory) => inventory?.location_code === location
    );

    return inventory;
  };

  const melbourneStock = getProductInventoryByLocation('MEL');
  const sydneyStock = getProductInventoryByLocation('SYD');
  const brisbaneStock = getProductInventoryByLocation('BNE');

  return (
    <div className="grid grid-cols-7 grid-rows-2 gap-y-4 my-5">
      <div className="border border-black rounded-2xl p-2 flex justify-between items-center col-span-3">
        <div className="flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Melbourne, VIC</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium">
            {melbourneStock?.quantity && melbourneStock?.quantity > 0
              ? 'In Stock'
              : 'Out of Stock'}
          </span>
          <span className="text-xs font-medium">
            {melbourneStock?.quantity}
          </span>
        </div>
      </div>
      <div className="border border-black rounded-2xl p-2 flex justify-between items-center col-span-3 col-start-5">
        <div className="flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Sydney, NSW</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium">
            {sydneyStock?.quantity && sydneyStock?.quantity > 0
              ? 'In Stock'
              : 'Out of Stock'}
          </span>
          <span className="text-xs font-medium">{sydneyStock?.quantity}</span>
        </div>
      </div>
      <div className="border border-black rounded-2xl p-2 flex justify-between items-center col-span-3 row-start-2 col-start-3">
        <div className="flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Brisbane, QLD</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium">
            {brisbaneStock?.quantity && brisbaneStock?.quantity > 0
              ? 'In Stock'
              : 'Out of Stock'}
          </span>
          <span className="text-xs font-medium">{brisbaneStock?.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopProductStockQuantities;
