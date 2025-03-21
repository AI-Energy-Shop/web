'use client';
import Image from 'next/image';
import { type Cart } from '@/store/features/cart';
import { cn } from '@/lib/utils';
import useCart from '@/hooks/useCart';
import { formatCurrency } from '@/utils/cart';
interface CartNotificationProps {
  carts?: Cart[];
}

const CartNotification: React.FC<CartNotificationProps> = ({ carts }) => {
  const { showCartWindow } = useCart();
  return (
    <div
      className={cn(
        `absolute right-0 top-11 bg-white shadow-lg opacity-0 transition-all ease-in-out duration-300  ${
          !showCartWindow
            ? 'opacity-100 hidden group-hover:block'
            : 'opacity-100 block'
        }`
        // `absolute right-0 top-11 bg-white shadow-lg block`
      )}
    >
      <div className="text-lg min-w-[250px] font-semibold bg-[#29294d] p-2 text-white text-center">
        Added to Cart
      </div>
      <div className="flex flex-col items-start rounded-sm">
        {carts?.map((cart) => (
          <div
            key={cart.documentId}
            className="flex border p-3 justify-between"
          >
            <div className="left w-20 h-20">
              <Image
                width={100}
                height={100}
                alt={cart.item.name}
                src={cart.item.image || '/no-product-image.jpg'}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="right">
              <h4 className="text-sm font-medium w-[200px] text-wrap text-left">
                {cart.item.name}
              </h4>
              <div className="mt-1 text-sm text-muted-foreground text-left">
                Qty: {cart.item.quantity}
                <br />
                {formatCurrency(
                  Number(
                    Number(cart.item.price.toFixed(2)) *
                      Number(cart.item.quantity)
                  ),
                  'USD'
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartNotification;
