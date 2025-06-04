'use client';
import { muktaVaani } from '@/assets/fonts/fonts';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormField } from '../../ui/form';
interface ProductQuantityProps {
  form?: UseFormReturn<any>;
  currentStock: number;
}

const ProductQuantity = ({ form, currentStock }: ProductQuantityProps) => {
  const handleIncrement = () => {
    const quantity = Number(form?.getValues('quantity')) || 0; // Ensure it's a number
    if (quantity < currentStock) {
      form?.setValue('quantity', quantity + 1);
    }
  };
  const handleDecrement = () => {
    const quantity = form?.getValues('quantity');

    if (quantity > 0 && quantity <= currentStock) {
      form?.setValue('quantity', quantity - 1);
    }
  };

  return (
    <div className="flex w-full h-10">
      <Button
        disabled={currentStock <= 0}
        type="button"
        size="icon"
        variant="ghost"
        onClick={handleDecrement}
        className="bg-gray-200 rounded-none w-full h-full flex-1 md:col-span-2 hover:bg-gray-200/90"
      >
        <Minus />
      </Button>
      <FormField
        control={form?.control}
        name="quantity"
        render={({ field }) => (
          <Input
            type="number"
            placeholder="0"
            {...field}
            className={`${muktaVaani.className} w-full h-full rounded-none flex-2 bg-white no-spinner text-center`}
          />
        )}
      />
      <Button
        disabled={currentStock <= 0}
        type="button"
        size="icon"
        variant="ghost"
        onClick={handleIncrement}
        className="bg-gray-200 rounded-none w-full h-full flex-1 md:col-span-2 hover:bg-gray-200/90"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default ProductQuantity;
