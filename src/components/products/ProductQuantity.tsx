'use client';
import { muktaVaani } from '@/assets/fonts/fonts';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { firaSans } from '@/app/font';
import { formatCurrency } from '@/utils/cart';
import { useState } from 'react';

interface ProductQuantityProps {
  price?: number;
  isPriceEnable?: boolean;
  setQuantity?: (quantity: number) => void;
}

const ProductQuantity = ({
  price,
  isPriceEnable = false,
}: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleSetQuantity = (quantity?: number) => {
    if (setQuantity) {
      setQuantity(quantity || 0);
    }
  };
  return (
    <div className="flex w-full h-10">
      {isPriceEnable && (
        <div
          className={`${firaSans.className} flex-1 font-semibold md:col-span-3 bg-gray-300 flex items-center justify-center`}
        >
          Qty
        </div>
      )}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() =>
          handleSetQuantity(quantity && quantity > 0 ? quantity - 1 : 0)
        }
        className="bg-gray-200 rounded-none w-full h-full flex-1 md:col-span-2 hover:bg-gray-200/90"
      >
        <Minus />
      </Button>
      <Input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => handleSetQuantity(Number(e.target.value))}
        className={`${muktaVaani.className} w-full h-full rounded-none flex-2 bg-white no-spinner text-center`}
      />
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() =>
          handleSetQuantity(quantity !== undefined ? quantity + 1 : 1)
        }
        className="bg-gray-200 rounded-none w-full h-full flex-1 md:col-span-2 hover:bg-gray-200/90"
      >
        <Plus />
      </Button>
      {isPriceEnable && (
        <div
          className={`${muktaVaani.className} flex-3 bg-white font-medium col-span-12 flex items-center md:items-end justify-center md:border-t md:border-t-black`}
        >
          <span className="md:text-[12px] md:pb-1">
            {formatCurrency(price && quantity ? price * quantity : 0, 'AUD')}{' '}
            ex.GST
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductQuantity;
