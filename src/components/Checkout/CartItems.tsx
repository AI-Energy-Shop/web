'use client';
import React from 'react';
import CartItem from './CartItem';
import { formatCurrency } from '@/utils/cart';

const CartItems = ({
  data,
  onChange,
  onAddQuant,
  onReduceQuant,
}: {
  data: any[];
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onReduceQuant: (id: string) => void;
  onAddQuant: (id: string) => void;
}) => {
  return (
    <div className="space-y-8 pt-8 md:pr-12">
      {data?.map?.((item) => {
        if (!item) return null;

        return (
          <CartItem
            key={item.documentId}
            id={item.documentId}
            image={item.image}
            title={item.title}
            refId={item.reference_id}
            price={item.price}
            gst={formatCurrency(item.gst, "USD")}
            quantity={item.quantity}
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
