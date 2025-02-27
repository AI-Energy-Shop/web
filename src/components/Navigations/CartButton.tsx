import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartNotification } from './CartNotifications';

interface CartButtonProps {
  cartStyle?: 'icon' | 'text';
  cartCount?: number;
}

const CartButton: React.FC<CartButtonProps> = ({
  cartStyle = 'text',
  cartCount = 0,
}) => {
  return (
    <div className="flex flex-col items-center m-0 w-auto h-auto px-1 relative group">
      {cartStyle === 'icon' ? (
        <>
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -right-3 -top-3 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {cartCount}
          </span>
        </>
      ) : (
        <>
          <ShoppingCart />
          <span className="text-sm font-normal">Cart(0)</span>
        </>
      )}

      <CartNotification />
    </div>
  );
};

export default CartButton;
