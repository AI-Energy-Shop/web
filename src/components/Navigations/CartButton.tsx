'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import CartNotification from './CartNotifications';
import Link from 'next/link';
import useCart from '@/hooks/useCart';
import { invalidateCartPath } from '@/app/actions/cart';
import { useRouter } from 'next/navigation';

interface CartButtonProps {
  cartStyle?: 'icon' | 'text';
}

const CartButton: React.FC<CartButtonProps> = ({ cartStyle = 'text' }) => {
  const { carts } = useCart();
  const router = useRouter();
  return (
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
      <ShoppingCart className="h-5 w-5" />
      {cartStyle === 'icon' ? (
        <>
          <span className="absolute -right-3 -top-3 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {carts.length}
          </span>
        </>
      ) : (
        <>
          <span className="text-sm font-normal">Cart({carts.length})</span>
        </>
      )}

      {carts.length > 0 && <CartNotification carts={carts} />}
    </Link>
  );
};

export default CartButton;
