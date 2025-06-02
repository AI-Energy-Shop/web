'use client';
import React from 'react';
import { formatCurrency } from '@/utils/cart';
import CartItemCard from '@/components/Checkout/CartItemCard';
import { CartsQuery } from '@/lib/gql/graphql';
import { useCheckout } from '@/hooks/useCheckout';
import { RootState, useAppSelector } from '@/store/store';

interface CartItemsProps {
  data: CartsQuery['carts'];
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onReduceQuant: (id: string) => void;
  onAddQuant: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItems = ({
  data,
  onChange,
  onAddQuant,
  onReduceQuant,
  onRemove,
}: CartItemsProps) => {
  const { warehouseLocation } = useCheckout();
  const user = useAppSelector((state: RootState) => state.me.me);

  return (
    <div className="space-y-8 pt-8 md:p-12">
      {data?.map?.((item) => {
        const price = item?.product?.price_lists?.find(
          (price) =>
            price?.user_level === user?.account_detail?.level &&
            !price?.min_quantity &&
            !price?.max_quantity
        );

        const productPriceBaseOnTable = item?.product?.price_lists.find(
          (price) =>
            (price?.min_quantity ?? Infinity) <= item.quantity &&
            (price?.max_quantity ?? -Infinity) >= item.quantity
        );

        const productPrice =
          productPriceBaseOnTable?.comparePrice ||
          productPriceBaseOnTable?.price ||
          price?.comparePrice ||
          price?.price ||
          0;

        const currentProductQuantity =
          item?.product?.inventory?.[
            warehouseLocation?.name as keyof typeof item.product.inventory
          ];

        return (
          <CartItemCard
            key={item?.documentId}
            id={item?.documentId!}
            image={item?.product?.images[0]?.url}
            title={item?.product?.name}
            model={item?.product?.model}
            price={productPrice}
            gst={formatCurrency(productPrice * 0.1, 'USD')}
            quantity={item?.quantity}
            stock={currentProductQuantity || 0}
            onAddQuant={onAddQuant}
            onReduceQuant={onReduceQuant}
            onChange={onChange}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

export default CartItems;
