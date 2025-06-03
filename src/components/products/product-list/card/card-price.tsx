import { formatCurrency } from '@/utils/currency';
import React from 'react';

interface CardPriceProps {
  regularPrice: number;
  comparePrice: number;
  showDiscount?: boolean;
}

const CardPrice = ({
  regularPrice,
  comparePrice,
  showDiscount = false,
}: CardPriceProps) => {
  return (
    <>
      <p className="text-sm text-gray-400 line-through row-span-1 h-4">
        {showDiscount &&
          comparePrice > 0 &&
          formatCurrency(regularPrice, 'USD')}
      </p>
      <p className="text-md font-bold row-span-1 block h-6">
        {comparePrice > 0 ? (
          <>
            {formatCurrency(comparePrice, 'USD')}
            <span className="text-xs font-normal ml-1">ex.GST</span>
          </>
        ) : (
          <>
            {formatCurrency(regularPrice, 'USD')}
            <span className="text-xs font-normal ml-1">ex.GST</span>
          </>
        )}
      </p>
    </>
  );
};

export default CardPrice;
