'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useCart from '@/hooks/useCart';
import { Form, FormField } from '../ui/form';
import { useAppSelector } from '@/store/hooks';
import ProductQuantity from './product-quantity';
import { formatCurrency } from '@/utils/currency';
import { ProductsQuery } from '@/lib/gql/graphql';
import { RootState } from '@/store/store';

type ProductCardproduct = {
  product: ProductsQuery['products'][0];
};

const ProductCard: React.FC<ProductCardproduct> = ({ product }) => {
  const { form, handleSubmit } = useCart({ productId: product?.documentId });
  const { me } = useAppSelector((state) => state.me);

  const warehouse = useAppSelector(
    (state: RootState) => state.me.me?.account_detail?.warehouseLocation?.name
  );

  const productSlug = product?.handle;
  const productLink = `/products/${productSlug}`;

  const defaultPrice = product?.price_lists.find(
    (price) => price?.user_level === 'default'
  );

  const bulkPrice = product?.price_lists.find(
    (price) => price?.user_level === me?.account_detail?.level
  );

  // Get the first price list entry if no user level match is found
  const itemPrice =
    product?.price_lists?.find((price) => {
      if (price?.user_level === me?.account_detail?.level) {
        return true;
      } else if (price?.user_level === 'default') {
        return true;
      }
      return false;
    }) || product?.price_lists?.at?.(0);

  // Ensure we have valid numbers for prices
  const defaultRegularPrice = Number(defaultPrice?.price) || 0;
  const defaultComparePrice = Number(defaultPrice?.comparePrice) || 0;

  const regularPrice = Number(itemPrice?.price) || 0;
  const comparePrice = Number(itemPrice?.comparePrice) || 0;

  // Use compare price if available, otherwise use regular price
  const productPrice = comparePrice || regularPrice || 0;

  const stocks =
    product?.inventory?.[warehouse as keyof typeof product.inventory] || 0;

  const renderProductImage = () => {
    return (
      <div className="aspect-[3/4] relative bg-[#e6e6e6]">
        {product?.images.at(0)?.url ? (
          <Image
            fill
            priority
            src={product?.images.at(0)?.url || '/no-product-image.jpg'}
            alt={product?.images.at(0)?.name || 'product image'}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
          />
        ) : (
          <Image
            fill
            priority
            src="/no-product-image.jpg"
            alt="no product image"
            className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
          />
        )}
      </div>
    );
  };

  const renderProductDetails = () => {
    return (
      <div className="flex flex-col justify-between">
        <h3
          className="font-medium text-sm mb-1 text-pretty"
          title={product?.name}
        >
          <span>{product?.name.slice(0, 40)} . . .</span>
        </h3>
        <p className="h-[20px] text-sm font-thin italic">{product?.model}</p>
      </div>
    );
  };

  const renderPriceAndStock = () => {
    if (!me) {
      return (
        <div className="grid grid-cols-1 my-3">
          <span className="text-sm row-span-1 text-[#1b1b3b]">
            Login to view price
          </span>
        </div>
      );
    }

    const currentInputQuantity = form.watch('quantity') || 0;

    const showBulkPrices =
      bulkPrice?.min_quantity &&
      currentInputQuantity >= bulkPrice?.min_quantity;

    const renderBulkPrices = () => {
      console.log('bulkPrice');

      return (
        <React.Fragment>
          <p
            key={bulkPrice?.documentId}
            className="text-sm text-gray-400 line-through row-span-1 h-4"
          >
            {bulkPrice?.price && formatCurrency(bulkPrice?.price, 'USD')}
          </p>
          <p className="text-md font-bold row-span-1 block h-6">
            {bulkPrice?.comparePrice && bulkPrice?.comparePrice > 0 ? (
              <>
                {formatCurrency(bulkPrice?.comparePrice, 'USD')}
                <span className="text-xs font-normal ml-1">ex.GST</span>
              </>
            ) : (
              <>
                {formatCurrency(bulkPrice?.price, 'USD')}
                <span className="text-xs font-normal ml-1">ex.GST</span>
              </>
            )}
          </p>
        </React.Fragment>
      );
    };

    const renderRegularPrice = () => {
      return (
        <>
          <p className="text-sm text-gray-400 line-through row-span-1 h-4">
            {defaultComparePrice > 0 &&
              formatCurrency(defaultRegularPrice, 'USD')}
          </p>
          <p className="text-md font-bold row-span-1 block h-6">
            {defaultComparePrice > 0 ? (
              <>
                {formatCurrency(defaultComparePrice, 'USD')}
                <span className="text-xs font-normal ml-1">ex.GST</span>
              </>
            ) : (
              <>
                {formatCurrency(defaultRegularPrice, 'USD')}
                <span className="text-xs font-normal ml-1">ex.GST</span>
              </>
            )}
          </p>
        </>
      );
    };

    return (
      <div className="grid grid-cols-1 grid-rows-3">
        {showBulkPrices === true ? renderBulkPrices() : renderRegularPrice()}
        <span
          className={cn(
            `${Number(stocks) > 0 ? 'text-green-900' : 'text-red-900'} text-sm row-span-1`
          )}
        >
          {Number(stocks) > 0 ? (
            <span className="text-green-900">In Stock ({Number(stocks)})</span>
          ) : (
            <span className="text-red-900">Out of Stock</span>
          )}
        </span>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-2">
            <FormField
              name="id"
              control={form.control}
              render={({ field }) => <Input type="hidden" {...field} />}
            />
            <ProductQuantity form={form} currentStock={Number(stocks)} />
            <Button disabled={Number(stocks) <= 0 || !me || productPrice === 0}>
              Add to Cart
            </Button>
          </div>
        </form>
      </Form>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <Link href={productLink}>
        <div className="flex flex-col gap-2">
          {renderProductImage()}
          {renderProductDetails()}
          {renderPriceAndStock()}
        </div>
      </Link>
      {renderForm()}
    </div>
  );
};

export default ProductCard;
