'use client';

import React from 'react';
import Link from 'next/link';
import { Loader2, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartNotification from './cart-notifications';
import { invalidateCartPath } from '@/app/actions/cart';
import useCartV2 from '@/hooks/useCartV2';

interface CartButtonProps {
  cartStyle?: 'icon' | 'text';
}

const CartButton: React.FC<CartButtonProps> = ({ cartStyle = 'text' }) => {
  const router = useRouter();

  const { carts, loading } = useCartV2();

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
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                carts?.length
              )}
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
            Cart({carts?.length})
          </Link>
        </span>
      )}

      <CartNotification carts={carts} />
    </div>
  );
};

export default CartButton;
