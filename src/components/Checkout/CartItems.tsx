'use client';
import React from 'react';
import { Cart } from '@/store/features/cart';
import { formatCurrency } from '@/utils/cart';
import CartItemCard from '@/components/Checkout/CartItemCard';
import useMe from '@/hooks/useMe';
import useCart from '@/hooks/useCart';

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
  const { user } = useMe();
  const { warehouse } = useCart();

  return (
    <div className="space-y-8 pt-8 md:p-12">
      {data?.map?.((item) => {
        const price = item?.product?.price_lists?.find((price) => price?.user_level === user?.account_detail?.level);

        const productPrice = price?.sale_price || price?.price || 0;

        const stock = item.product?.inventories?.find((inventory) => inventory?.name === warehouse?.address.city);

        return (
          <CartItemCard
            key={item.documentId}
            id={item.documentId}
            image={item.product?.images[0]?.url}
            title={item.product?.name}
            model={item.product?.model}
            price={productPrice}
            gst={formatCurrency(productPrice * 0.1, 'USD')}
            quantity={item.quantity}
            stock={stock?.quantity || 0}
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
