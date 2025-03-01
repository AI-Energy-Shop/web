'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import CartNotification from './CartNotifications';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface CartButtonProps {
  cartStyle?: 'icon' | 'text';
}

const CartButton: React.FC<CartButtonProps> = ({ cartStyle = 'text' }) => {
  const carts = useSelector((state: RootState) => state.cart.carts);
  const [cartLength, setCartLength] = useState<number>(0);

  useEffect(() => {
    setCartLength(carts?.length || 0);
  }, [carts]);

  return (
    <Link
      href="/checkout"
      className="flex flex-col items-center m-0 w-auto h-auto px-1 relative group"
    >
      <ShoppingCart className="h-5 w-5" />
      {cartStyle === 'icon' ? (
        <>
          <span className="absolute -right-3 -top-3 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {cartLength}
          </span>
        </>
      ) : (
        <>
          <span className="text-sm font-normal">Cart({cartLength})</span>
        </>
      )}

      {cartLength > 0 && <CartNotification carts={carts} />}
    </Link>
  );
};

export default CartButton;
