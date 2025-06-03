'use client';
import { z } from 'zod';
import React, { BaseSyntheticEvent } from 'react';
import { Input } from '@/components/ui/input';
import { firaSans } from '@/app/font';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';

interface ProductAddToCartButtonProps {
  form: UseFormReturn<
    {
      id: string;
      quantity: number;
    },
    any,
    {
      id: string;
      quantity: number;
    }
  >;
  stocks: number;
  productId?: string;
  productPrice: number;
  isDecrementDisabled: boolean;
  isIncrementDisabled: boolean;
  handleSubmit: (data: AddToCartFormData) => void;
  handleOnError?: (onError: any) => void;
}

const ProductAddToCartButton: React.FC<ProductAddToCartButtonProps> = ({
  form,
  stocks,
  productId,
  productPrice,
  isDecrementDisabled,
  isIncrementDisabled,
  handleSubmit,
  handleOnError,
}) => {
  const handleIncrement = () => {
    const quantity = Number(form?.getValues('quantity')) || 0; // Ensure it's a number
    if (quantity < stocks) {
      form?.setValue('quantity', quantity + 1);
    }
  };
  const handleDecrement = () => {
    const quantity = form?.getValues('quantity');

    if (quantity > 0 && quantity <= stocks) {
      form?.setValue('quantity', quantity - 1);
    }
  };

  return (
    <div className="bg-light-yellow max-md:px-4 md:bg-white md:mt-6">
      <div className="mx-auto">
        {/* <PickupLocation product={product} pickLocation={pickLocation} /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, handleOnError)}>
            <FormField
              control={form.control}
              name="id"
              defaultValue={productId}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input type="hidden" {...field} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <div className="mx-auto text-center max-md:px-2 md:mt-6 md:py-2 md:flex md:justify-between">
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
                    disabled={isDecrementDisabled}
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
                            type="number"
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            className="h-8 w-20 border-none rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
                    disabled={isIncrementDisabled}
                    className="cursor-pointer h-8 w-8 border-l rounded-none bg-gray-300"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-lg font-semibold">
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {productPrice.toFixed(2)} ex. GST
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!stocks}
                className={`${firaSans.className} max-md:mt-3 max-md:mb-5 w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold md:basis-[57.98%] text-[20px] md:text-[28px] md:rounded-lg md:h-16`}
              >
                {stocks || (stocks && stocks > 0)
                  ? 'Add to Cart'
                  : 'Out of Stock'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductAddToCartButton;
