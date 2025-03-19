'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { addToCartFormSchema } from '@/lib/validation-schema/add-to-cart-form';
import { FormField, FormItem, FormControl } from '../ui/form';
interface ShopProductQuantityButtonsProps {
  price: number;
  defaultQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  disabled?: boolean;
  form: UseFormReturn<z.infer<typeof addToCartFormSchema>>;
}

const ShopProductQuantityButtons: React.FC<ShopProductQuantityButtonsProps> = ({
  price,
  defaultQuantity = 0,
  minQuantity = 1,
  maxQuantity = 20,
  disabled = false,
  form,
}) => {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [defaultPrice, setDefaultPrice] = useState(price);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity?.(quantity + 1);
      setDefaultPrice(defaultPrice + price);
    }
  };

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      setQuantity?.(quantity - 1);
      setDefaultPrice(defaultPrice - price);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      if (value < minQuantity) {
        setQuantity?.(minQuantity);
        setDefaultPrice(minQuantity * price);
      } else if (value > maxQuantity) {
        setQuantity?.(maxQuantity);
        setDefaultPrice(maxQuantity * price);
      } else {
        setQuantity?.(value);
        setDefaultPrice(value * price);
      }
    }
  };

  const renderHiddenInput = ({
    name,
    defaultValue,
  }: {
    name: keyof z.infer<typeof addToCartFormSchema>;
    defaultValue: number;
  }) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="hidden" {...field} defaultValue={defaultValue} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden">
      <div className="flex items-center border-b gap-0">
        <div className="h-8 w-12 text-sm font-medium flex items-center justify-center bg-gray-500 m-0">
          QTY
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleDecrement}
          disabled={disabled || quantity >= maxQuantity}
          className="cursor-pointer h-8 w-8 border-l rounded-none bg-gray-300"
        >
          <Minus className="h-3 w-3" />
        </Button>

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={quantity}
                  disabled={disabled}
                  min={minQuantity}
                  max={maxQuantity}
                  onChange={handleInputChange}
                  className="h-8 w-20 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleIncrement}
          disabled={disabled || quantity >= maxQuantity}
          className="cursor-pointer h-8 w-8 border-l rounded-none bg-gray-300"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <div className="text-lg font-semibold">
        <input name="price" type="hidden" value={defaultPrice} />
        <span className="text-sm font-normal text-gray-500 ml-1">
          {(price * quantity).toFixed(2)} ex. GST
        </span>
      </div>
    </div>
  );
};

export default ShopProductQuantityButtons;
