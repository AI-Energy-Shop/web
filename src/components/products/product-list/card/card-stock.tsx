import { cn } from '@/lib/utils';
import React from 'react';

interface CardStockProps {
  stock: number;
}

const CardStock = ({ stock }: CardStockProps) => {
  return (
    <span
      className={cn(
        `${stock > 0 ? 'text-green-900' : 'text-red-900'} text-sm row-span-1`
      )}
    >
      {stock > 0 ? (
        <span className="text-green-900">In Stock ({stock})</span>
      ) : (
        <span className="text-red-900">Out of Stock</span>
      )}
    </span>
  );
};

export default CardStock;
