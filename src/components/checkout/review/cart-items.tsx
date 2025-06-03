'use client';

import React, { useCallback, useState } from 'react';
import { useAppSelector } from '@/store/store';
import CartItem from '@/components/checkout/review/cart-item';
import useCartV2 from '@/hooks/useCartV2';
import ModalWrapper from '../modal-wrapper';
import { Loader2 } from 'lucide-react';

interface CartItemsProps {}

const CartItems: React.FC<CartItemsProps> = () => {
  const [showModal, setShowModal] = useState(false);
  const [toRemoveId, setToRemoveId] = useState('');
  const user = useAppSelector((state) => state.me.me);
  const userLevel = user?.account_detail?.level;
  const warehouseLocation = user?.account_detail?.warehouseLocation?.name;

  const { carts, loading, debouncedUpdateCartItem, debouncedRemoveCartItem } =
    useCartV2();

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const id = e.currentTarget.dataset.id;
      const name = e.currentTarget.name;
      const cartItem = carts.find((cart) => cart?.documentId === id);

      if (!cartItem) return;

      try {
        switch (name) {
          case 'increment':
            debouncedUpdateCartItem({
              documentId: cartItem.documentId,
              quantity: cartItem?.quantity + 1,
            });
            break;
          case 'decrement':
            // Prevent quantity from going below 0
            const newQuantity = Math.max(0, cartItem?.quantity - 1);

            if (newQuantity === 0) {
              debouncedRemoveCartItem({
                documentId: cartItem.documentId,
              });
            } else {
              debouncedUpdateCartItem({
                documentId: cartItem.documentId,
                quantity: newQuantity,
              });
            }
            break;
          default:
            console.warn(`Unknown button action: ${name}`);
            break;
        }
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
        // You could also show a toast notification or handle the error in another way
      }
    },
    [carts, debouncedUpdateCartItem]
  );

  const handleChange = useCallback(
    (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) >= 0)) {
        debouncedUpdateCartItem({
          documentId: id,
          quantity: parseInt(value),
        });
      }
    },
    [debouncedUpdateCartItem]
  );

  const handleConfirmRemove = useCallback(() => {
    debouncedRemoveCartItem({
      documentId: toRemoveId,
    });
    setShowModal(false);
  }, [toRemoveId, debouncedRemoveCartItem]);

  const handleRemove = (id: string) => {
    setToRemoveId(id);
    setShowModal(true);
  };

  return (
    <>
      <div className="space-y-8 pt-8 md:p-12">
        {loading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : (
          carts?.map?.((item) => {
            return (
              <CartItem
                item={item}
                userLevel={userLevel}
                key={item?.documentId}
                warehouseLocation={warehouseLocation}
                onAddQuant={handleButtonClick}
                onReduceQuant={handleButtonClick}
                onChange={handleChange}
                onRemove={handleRemove}
              />
            );
          })
        )}
      </div>
      <ModalWrapper
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        description="You are about to remove this item from your cart."
        message="Are you sure you want to remove this item from your cart?"
      />
    </>
  );
};

export default CartItems;
