'use client';
import Image from 'next/image';
import { type Cart } from '@/store/features/cart';

interface CartNotificationProps {
  carts?: any[];
}

const CartNotification: React.FC<CartNotificationProps> = ({ carts }) => {
  return (
    <div className="absolute right-0 top-11 bg-white shadow-lg hidden group-hover:block">
      <div className="text-lg min-w-[250px] font-semibold bg-[#29294d] p-2 text-white text-center">
        Added to Cart
      </div>
      <div className="flex flex-col items-start rounded-sm">
        {carts?.map((cart) => (
          <div key={cart.id} className="flex border p-3 justify-between">
            <div className="left w-20 h-20">
              <Image
                width={100}
                height={100}
                alt={cart.name}
                src={cart.image || '/no-product-image.jpg'}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="right">
              <h4 className="text-sm font-medium w-[200px] text-wrap text-left">
                {cart.name}
              </h4>
              <div className="mt-1 text-sm text-muted-foreground text-left">
                Qty: {cart.quantity}
                <br />${cart.price * cart.quantity} excl. GST
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartNotification;
