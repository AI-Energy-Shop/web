'use client';
import React from 'react';
import useMe from '@/hooks/useMe';
import { formatCurrency } from '@/utils/cart';
import { useCheckout } from '@/hooks/useCheckout';
import CartItem from '@/components/checkout/cart-item';
import { CartsQuery, GetCheckoutUserDataQuery } from '@/lib/gql/graphql';

interface CartItemsProps {
  data: CartsQuery['carts'];
  onChange: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onReduceQuant: (id: string) => void;
  onAddQuant: (id: string) => void;
  onRemove: (id: string) => void;
  cartProductQuantity: GetCheckoutUserDataQuery;
}

const CartItems = ({
  data,
  onChange,
  onAddQuant,
  onReduceQuant,
  onRemove,
  cartProductQuantity,
}: CartItemsProps) => {
  const { user } = useMe();
  const { warehouseLocation } = useCheckout();

  return (
    <div className="space-y-8 pt-8 md:p-12">
      {data?.map?.((item) => {
        const priceList = item?.product?.price_lists;

        const defaultPrice = priceList?.find(
          (price) => price?.user_level === 'default'
        );

        const price = priceList?.find((price) => {
          if (
            price?.user_level === user?.account_detail?.level &&
            !price?.min_quantity &&
            !price?.max_quantity
          ) {
            return price;
          }
        });

        const productPrice = price?.comparePrice || price?.price || 0;

        const currentProduct =
          cartProductQuantity?.usersPermissionsUser?.carts.find(
            (cart) => cart?.documentId === item?.documentId
          );

        const currentProductQuantity =
          currentProduct?.product?.inventory?.[
            warehouseLocation?.name as keyof typeof currentProduct.product.inventory
          ];

        return (
          <CartItem
            key={item?.documentId}
            id={item?.documentId!}
            image={item?.product?.images?.at(0)?.url}
            title={item?.product?.name}
            model={item?.product?.model}
            price={productPrice}
            gst={formatCurrency(productPrice, 'USD')}
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
