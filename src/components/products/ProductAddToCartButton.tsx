'use client';
import { z } from 'zod';
import React from 'react';
import useMe from '@/hooks/useMe';
import { Input } from '../ui/input';
import { firaSans } from '@/app/font';
import useCart from '@/hooks/useCart';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
import { GetStoreProductQuery } from '@/lib/gql/graphql';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { addToCartSchema } from '@/lib/validation-schema/add-to-cart-form';
import { useAppSelector } from '@/store/store';

interface ProductAddToCartButtonProps {
  product: GetStoreProductQuery['getStoreProduct'];
}

const ProductAddToCartButton = ({ product }: ProductAddToCartButtonProps) => {
  const {
    handleSubmit,
    handleOnError,
    handleIncrement,
    handleDecrement,
    form,
  } = useCart({
    product,
  });
  const warehouse = useAppSelector(
    (state) => state.checkout.warehouseLocation.name
  );
  const user = useAppSelector((state) => state.me.me);

  const priceList = product?.price_lists?.map((price) => ({
    documentId: price?.documentId,
    price: price?.price ?? undefined,
    comparePrice: price?.comparePrice ?? undefined,
    user_level: price?.user_level ?? undefined,
  }));

  const itemPrice = priceList?.find(
    (price) => price?.user_level === user?.account_detail?.level
  );

  const salePrice = itemPrice?.comparePrice;
  const regularPrice = itemPrice?.price;
  const productPrice = salePrice ? salePrice : regularPrice || 0;
  const stocks =
    Number(product?.inventory?.[warehouse as keyof typeof product.inventory]) ||
    0;

  const renderHiddenInput = ({
    name,
  }: {
    name: keyof z.infer<typeof addToCartSchema>;
  }) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  if (!user) {
    return (
      <div className="w-full h-20 flex justify-center items-center">
        <span className="text-sm row-span-1 text-[#1b1b3b]">
          Login to view price
        </span>
      </div>
    );
  }

  return (
    <div className="bg-yellow-light-yellow max-md:px-4 md:bg-white md:mt-6">
      <div className="mx-auto">
        {/* <PickupLocation product={product} pickLocation={pickLocation} /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, handleOnError)}>
            {renderHiddenInput({ name: 'id' })}
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
                    disabled={stocks <= 0 || form.watch('quantity') <= 0}
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
                    disabled={stocks <= 0 || form.watch('quantity') >= stocks}
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
