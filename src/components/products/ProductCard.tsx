'use client';
import { formatCurrency } from '@/utils/currency';
import { ProductsQuery } from '@/lib/gql/graphql';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Form, FormField } from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import ProductQuantity from './ProductQuantity';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  addToCartResolver,
  addToCartSchema,
} from '@/lib/validation-schema/add-to-cart-form';

type ProductCardproduct = {
  product?: ProductsQuery['products'][0] | null;
  productPrice: number;
  stocks: number;
  itemPrice: any;
  userID: string;
  onSubmit: (data: z.infer<typeof addToCartSchema>) => void;
};

const ProductCard: React.FC<ProductCardproduct> = ({
  product,
  productPrice,
  stocks,
  itemPrice,
  userID,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof addToCartSchema>>({
    resolver: addToCartResolver,
    defaultValues: {
      id: product?.documentId || '',
      quantity: 0,
    },
  });

  const productSlug = product?.name;

  const productLink = `/products/${productSlug}`;

  const renderPriceAndStock = () => {
    if (!userID) {
      return (
        <div className="grid grid-cols-1 my-3">
          <span className="text-sm row-span-1 text-[#1b1b3b]">
            Login to view price
          </span>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 grid-rows-3">
        <span className="text-sm text-gray-400 line-through row-span-1">
          {itemPrice?.price ? formatCurrency(itemPrice.price, 'USD') : null}
        </span>
        <p className="text-md font-bold row-span-1 block h-auto">
          {formatCurrency(productPrice || 0, 'USD')} ex.GST
          <span className="text-xs font-normal"></span>
        </p>
        <span
          className={cn(
            `${stocks > 0 ? 'text-green-900' : 'text-red-900'} text-sm  row-span-1`
          )}
        >
          {stocks > 0 ? (
            <span className="text-green-900">In Stock ({stocks})</span>
          ) : (
            <span className="text-red-900">Out of Stock</span>
          )}
        </span>
      </div>
    );
  };

  const renderHiddenInput = (name: keyof z.infer<typeof addToCartSchema>) => {
    return (
      <FormField
        name={name}
        control={form.control}
        render={({ field }) => <Input type="hidden" {...field} />}
      />
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <Link href={productLink}>
        <div className="flex flex-col gap-2">
          {/* IMAGE */}
          <div className="aspect-[3/4] relative bg-[#e6e6e6]">
            <Image
              fill
              priority
              src={
                product?.images[0]?.url ||
                (process.env.NEXT_PUBLIC_DEFAULT_PRODUCT_IMAGE as string)
              }
              alt={product?.images[0]?.name || 'product image'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
            />
          </div>
          {/* NAME AND MODEL */}
          <div className="flex flex-col justify-between">
            <h3
              className="font-medium text-sm mb-1 text-pretty"
              title={product?.name}
            >
              <span>{product?.name.slice(0, 40)} . . .</span>
            </h3>
            <p className="text-sm font-thin italic">{product?.model}</p>
          </div>
          {renderPriceAndStock()}
        </div>
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {renderHiddenInput('id')}
          <ProductQuantity form={form} />
          <Button
            disabled={stocks <= 0}
            type="submit"
            className={cn(`w-full mt-2 bg-[#1b1b3b] text-white`)}
          >
            Add to Cart
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductCard;
