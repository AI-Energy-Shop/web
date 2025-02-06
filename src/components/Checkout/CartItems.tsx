'use client';
import React from 'react';
import CartItem from './CartItem';
import { formatCurrency } from '@/utils/cart';
import { CartItemType } from '@/lib/types';
const CartItems = ({
  data,
  onChange,
  onAddQuant,
  onReduceQuant,
}: {
  data: CartItemType[];
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onReduceQuant: (id: string) => void;
  onAddQuant: (id: string) => void;
}) => {
  return (
    <div className="space-y-8 pt-8 md:pr-12">
      {data?.map?.((item) => {
        if (!item.item) return null;
        return (
          <CartItem
            key={item.documentId}
            id={item.documentId}
            image={item.item.image}
            title={item.item.title}

            refId={item.item.reference_id}
            price={item.item.price ?? 0}
            gst={formatCurrency(((item?.item?.price ?? 0) * 0.10), 'USD')}
            quantity={item.item.quantity ?? 0}
            onAddQuant={onAddQuant}
            onReduceQuant={onReduceQuant}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export default CartItems;
