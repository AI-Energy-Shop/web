'use client';
import React from 'react';
import { Cart } from '@/store/features/cart';
import { formatCurrency } from '@/utils/cart';
import CartItemCard from '@/components/Checkout/CartItemCard';

const CartItems = ({
  data,
  onChange,
  onAddQuant,
  onReduceQuant,
  onRemove,
}: {
  data: Cart[];
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onReduceQuant: (id: string) => void;
  onAddQuant: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="space-y-8 pt-8 md:p-12">
      {data?.map?.((item) => {
        return (
          <CartItemCard
            key={item.documentId}
            id={item.documentId}
            image={item.item.image}
            title={item.item.name}
            model={item.item.model}
            price={item.item.price}
            gst={formatCurrency(item?.item?.price * 0.1, 'USD')}
            quantity={item.item.quantity}
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
