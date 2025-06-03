'use client';

import React, { useCallback } from 'react';
import { AddToCartFormData } from '@/lib/validation-schema/add-to-cart-form';
import { useAppSelector } from '@/store/store';
import CartItem from '@/components/checkout/review/cart-item';
import useCartV2 from '@/hooks/useCartV2';

interface CartItemsProps {}

const CartItems: React.FC<CartItemsProps> = () => {
  // const carts = useAppSelector((state) => state.cart.carts);
  const user = useAppSelector((state) => state.me.me);
  const userLevel = user?.account_detail?.level;
  const warehouseLocation = user?.account_detail?.warehouseLocation?.name;
  const { debouncedUpdateCartItem, carts } = useCartV2();

  const handleAddQuant = (id: string) => {
    const cart = carts.find((cart) => cart?.documentId === id);
    if (cart) {
      if (cart.quantity <= 1) {
        console.log(id);
      } else {
        console.log(id);
      }
    }
  };

  const handleReduceQuant = (id: string) => {
    const cart = carts.find((cart) => cart?.documentId === id);
    if (cart) {
      if (cart.quantity <= 1) {
        console.log(id);
      } else {
        console.log(id);
      }
    }
  };

  const handleRemove = (id: string) => {
    console.log(id);
  };

  const handleChange = useCallback((id: string, value: string) => {
    debouncedUpdateCartItem({
      documentId: id,
      quantity: parseInt(value),
    });
  }, []);

  console.log(carts);

  return (
    <div className="space-y-8 pt-8 md:p-12">
      {carts?.map?.((item) => {
        return (
          <CartItem
            item={item}
            userLevel={userLevel}
            key={item?.documentId}
            warehouseLocation={warehouseLocation}
            onAddQuant={handleAddQuant}
            onReduceQuant={handleReduceQuant}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        );
      })}
    </div>
  );
};

export default CartItems;
