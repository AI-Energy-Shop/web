'use client';
import useProductPricing from '@/hooks/useProductPricing';
import { GetStoreProductQuery } from '@/lib/gql/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import CardDetails from './card/card-details';
import { useForm } from 'react-hook-form';
import CardImage from './card/card-image';
import CardPrice from './card/card-price';
import CardStock from './card/card-stock';
import CardForm from './card/card-form';
import Link from 'next/link';
import React from 'react';

import {
  AddToCartFormData,
  addToCartSchema,
} from '@/lib/validation-schema/add-to-cart-form';

type ProductCardProps = {
  product: GetStoreProductQuery['getStoreProduct'];
  onSubmit: (product: AddToCartFormData) => void;
  warehouse: string;
  userLevel: string;
  isLoggedIn: boolean;
};

const FallbackPriceAndStock: React.FC = () => {
  return (
    <div className="grid grid-cols-1 my-3">
      <span className="text-sm row-span-1 text-[#1b1b3b]">
        Login to view price
      </span>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  warehouse,
  userLevel,
  isLoggedIn,
  onSubmit,
}) => {
  const form = useForm<AddToCartFormData>({
    resolver: zodResolver(addToCartSchema),
    defaultValues: {
      id: product?.documentId || '',
      quantity: 0,
    },
  });

  const stock = Number(
    product?.inventory?.[warehouse as keyof typeof product.inventory] || 0
  );

  const currentQuantity = form.watch('quantity') || 0;

  const { displayPrice, comparePrice } = useProductPricing(
    product,
    userLevel,
    currentQuantity
  );

  const hasValidPrice = displayPrice > 0;

  const handleSubmit = (data: AddToCartFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <Link href={`/products/${product?.handle}`}>
        <div className="flex flex-col gap-2">
          <CardImage product={product} />
          <CardDetails product={product} />
          {isLoggedIn ? (
            <>
              <CardPrice
                regularPrice={displayPrice}
                comparePrice={comparePrice}
                showDiscount={comparePrice > 0}
              />
              <CardStock stock={stock} />
            </>
          ) : (
            <FallbackPriceAndStock />
          )}
        </div>
      </Link>
      <CardForm
        form={form}
        stock={stock}
        isLoggedIn={isLoggedIn}
        handleSubmit={handleSubmit}
        hasValidPrice={hasValidPrice}
      />
    </div>
  );
};

export default ProductCard;
