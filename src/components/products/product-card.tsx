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

type ProductCardProps = {
  product: ProductsQuery['products'][0];
};

// Custom hook to handle price logic
const useProductPricing = (
  product: ProductsQuery['products'][0],
  userLevel?: string,
  currentQuantity: number = 0
) => {
  const priceList =
    product?.price_lists
      ?.map((price) => ({
        documentId: price?.documentId,
        price: price?.price ?? 0,
        comparePrice: price?.comparePrice ?? 0,
        min_quantity: price?.min_quantity ?? 0,
        max_quantity: price?.max_quantity ?? 0,
        user_level: price?.user_level ?? '',
      }))
      .sort((a, b) => a.min_quantity - b.min_quantity) || [];

  // Helper function to find user-specific pricing based on quantity and user level
  const findUserPricing = () => {
    return priceList?.find((priceItem) => {
      const { min_quantity = 0, max_quantity = 0, user_level } = priceItem;

      return (
        user_level === userLevel &&
        currentQuantity >= min_quantity &&
        (max_quantity === 0 || currentQuantity <= max_quantity)
      );
    });
  };

  // Helper function to find default pricing
  const findDefaultPricing = () => {
    return priceList?.find((priceItem) => priceItem?.user_level === 'default');
  };

  // Determine which pricing to display
  const userSpecificPricing = findUserPricing();
  const defaultPricing = findDefaultPricing();
  const displayPricing = userSpecificPricing || defaultPricing;

  // Helper function to get the main price to display
  const getDisplayPrice = (priceData: typeof displayPricing) => {
    return priceData?.price || priceData?.comparePrice || 0;
  };

  return {
    priceList,
    defaultPricing,
    userSpecificPricing,
    displayPricing,
    displayPrice: getDisplayPrice(displayPricing),
    comparePrice: displayPricing?.comparePrice || 0,
  };
};

// Component for product image
const ProductImage: React.FC<{ product: ProductsQuery['products'][0] }> = ({
  product,
}) => {
  const imageUrl = product?.images.at(0)?.url || '/no-product-image.jpg';
  const imageAlt = product?.images.at(0)?.name || 'product image';

  return (
    <div className="aspect-[3/4] relative bg-[#e6e6e6]">
      <Image
        fill
        priority
        src={imageUrl}
        alt={imageAlt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
      />
    </div>
  );
};

// Component for product details
const ProductDetails: React.FC<{ product: ProductsQuery['products'][0] }> = ({
  product,
}) => (
  <div className="flex flex-col justify-between">
    <h3 className="font-medium text-sm mb-1 text-pretty" title={product?.name}>
      <span>{product?.name.slice(0, 40)} . . .</span>
    </h3>
    <p className="h-[20px] text-sm font-thin italic">{product?.model}</p>
  </div>
);

// Component for stock status
const StockStatus: React.FC<{ stock: number }> = ({ stock }) => (
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

// Component for price display
const PriceDisplay: React.FC<{
  regularPrice: number;
  comparePrice: number;
  showDiscount?: boolean;
}> = ({ regularPrice, comparePrice, showDiscount = false }) => (
  <>
    <p className="text-sm text-gray-400 line-through row-span-1 h-4">
      {showDiscount && comparePrice > 0 && formatCurrency(regularPrice, 'USD')}
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

// Component for price and stock section
const PriceAndStock: React.FC<{
  product: ProductsQuery['products'][0];
  userLevel?: string;
  stock: number;
  currentQuantity: number;
  isLoggedIn: boolean;
}> = ({ product, userLevel, stock, currentQuantity, isLoggedIn }) => {
  const { displayPrice, comparePrice } = useProductPricing(
    product,
    userLevel,
    currentQuantity
  );

  if (!isLoggedIn) {
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
      <PriceDisplay
        regularPrice={displayPrice}
        comparePrice={comparePrice}
        showDiscount={comparePrice > 0}
      />
      <StockStatus stock={stock} />
    </div>
  );
};

// Component for add to cart form
const AddToCartForm: React.FC<{
  form: any;
  handleSubmit: any;
  stock: number;
  isLoggedIn: boolean;
  hasValidPrice: boolean;
}> = ({ form, handleSubmit, stock, isLoggedIn, hasValidPrice }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex flex-col gap-2">
        <FormField
          name="id"
          control={form.control}
          render={({ field }) => <Input type="hidden" {...field} />}
        />
        <ProductQuantity form={form} currentStock={stock} />
        <Button disabled={stock <= 0 || !isLoggedIn || !hasValidPrice}>
          Add to Cart
        </Button>
      </div>
    </form>
  </Form>
);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { form, handleSubmit } = useCart({ productId: product?.documentId });
  const { me } = useAppSelector((state) => state.me);

  const warehouse = useAppSelector(
    (state: RootState) => state.me.me?.account_detail?.warehouseLocation?.name
  );

  // Derived values
  const productSlug = product?.handle;
  const productLink = `/products/${productSlug}`;
  const stock = Number(
    product?.inventory?.[warehouse as keyof typeof product.inventory] || 0
  );
  const currentQuantity = form.watch('quantity') || 0;
  const isLoggedIn = Boolean(me);

  const { displayPrice } = useProductPricing(
    product,
    me?.account_detail?.level,
    currentQuantity
  );
  const hasValidPrice = displayPrice > 0;

  return (
    <div className="bg-white p-4 rounded-lg">
      <Link href={productLink}>
        <div className="flex flex-col gap-2">
          <ProductImage product={product} />
          <ProductDetails product={product} />
          <PriceAndStock
            product={product}
            userLevel={me?.account_detail?.level}
            stock={stock}
            currentQuantity={currentQuantity}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </Link>
      <AddToCartForm
        form={form}
        handleSubmit={handleSubmit}
        stock={stock}
        isLoggedIn={isLoggedIn}
        hasValidPrice={hasValidPrice}
      />
    </div>
  );
};

export default ProductCard;
