'use client';
import Image from 'next/image';
import { type Cart } from '@/store/features/cart';
import { cn } from '@/lib/utils';
import useCart from '@/hooks/useCart';
import { formatCurrency } from '@/utils/cart';
import useMe from '@/hooks/useMe';
interface CartNotificationProps {
  carts?: Cart[];
}

const CartNotification: React.FC<CartNotificationProps> = () => {
  const { user } = useMe();
  const { carts, showCartWindow } = useCart();

  return (
    <div
      className={cn(
        `absolute right-0 top-10 bg-white shadow-lg opacity-0 transition-all ease-in-out duration-300 ${
          !showCartWindow ? 'opacity-100 hidden group-hover:block' : 'opacity-100 block'
        }`
      )}
    >
      <div className="text-lg min-w-[250px] font-semibold bg-[#29294d] p-2 text-white text-center">Added to Cart</div>
      <div className="flex flex-col items-start rounded-sm">
        {carts?.map((cart) => {
          const price = cart.product?.price_lists?.find((price) => price?.user_level === user?.account_detail?.level);
          return (
            <div key={cart.documentId} className="flex border p-3 justify-between">
              <div className="left w-20 h-20">
                <Image
                  width={100}
                  height={100}
                  alt={cart.product?.name || ''}
                  src={cart.product?.images[0]?.url || '/no-product-image.jpg'}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="right">
                <h4 className="text-sm font-medium w-[200px] text-wrap text-left">{cart.product?.name}</h4>
                <div className="mt-1 text-sm text-muted-foreground text-left">
                  Qty: {cart.quantity}
                  <br />
                  {formatCurrency(Number(Number(price?.price?.toFixed(2)) * Number(cart.quantity)), 'USD')}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartNotification;
