'use client';
import { muktaVaani } from '@/assets/fonts/fonts';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { firaSans } from '@/app/font';
import { formatCurrency } from '@/utils/cart';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
interface ProductQuantityProps {
  price?: number;
  isPriceEnable?: boolean;
  form?: UseFormReturn<any>;
}

const ProductQuantity = ({
  price,
  form,
  isPriceEnable = false,
}: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleSetQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    switch (target.name) {
      case 'add':
        form?.setValue('quantity', Number(form?.getValues('quantity')) + 1);
        break;
      case 'minus':
        form?.setValue(
          'quantity',
          Number(form?.getValues('quantity')) &&
            Number(form?.getValues('quantity')) > 0
            ? Number(form?.getValues('quantity')) - 1
            : 0
        );
        break;
      default:
        break;
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
        name="minus"
        size="icon"
        variant="ghost"
        onClick={handleSetQuantity}
        className="bg-gray-200 rounded-none w-full h-full flex-1 md:col-span-2 hover:bg-gray-200/90"
      >
        <Minus />
      </Button>
      <Input
        type="number"
        placeholder="0"
        {...form?.register('quantity')}
        className={`${muktaVaani.className} w-full h-full rounded-none flex-2 bg-white no-spinner text-center`}
      />
      <Button
        type="button"
        name="add"
        size="icon"
        variant="ghost"
        onClick={handleSetQuantity}
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
