'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import CartNotification from './CartNotifications';
import { invalidateCartPath } from '@/app/actions/cart';

interface CartButtonProps {
  cartStyle?: 'icon' | 'text';
}

const CartButton: React.FC<CartButtonProps> = ({ cartStyle = 'text' }) => {
  const carts = useAppSelector((state) => state.cart.carts);
  const router = useRouter();

  return (
    <div className="relative group">
      {cartStyle === 'icon' ? (
        <div className="h-[40px] flex flex-col items-center justify-between">
          <Link
            prefetch={false}
            href="/cart"
            className="flex flex-col items-center m-0 w-auto h-auto px-1 group relative"
            onClick={async (e) => {
              e.preventDefault();
              invalidateCartPath();
              router.push('/cart');
            }}
          >
            <ShoppingCart className="h-5 w-5" />
            <p className="text-xs lg:text-sm h-[15px]">Cart</p>
            <span className="absolute -right-0 -top-3 text-[11px] h-5 w-5 rounded-full bg-red-500 font-bold text-white flex items-center justify-center">
              {carts.length}
            </span>
          </Link>
        </div>
      ) : (
        <span className="text-[10px] lg:text-sm font-normal">
          <Link
            prefetch={false}
            href="/cart"
            className="flex flex-col items-center m-0 w-auto h-auto px-1 relative group"
            onClick={async (e) => {
              e.preventDefault();
              invalidateCartPath();
              router.push('/cart');
            }}
          >
            Cart({carts.length})
          </Link>
        </span>
      )}

      {carts.length > 0 && <CartNotification />}
    </div>
  );
};

export default CartButton;
