'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/cart';
import { useAppSelector } from '@/store/store';
import useCartV2 from '@/hooks/useCartV2';
import { CartsQuery } from '@/lib/gql/graphql';

interface CartNotificationProps {
  carts?: CartsQuery['carts'];
}
const CartNotification: React.FC<CartNotificationProps> = ({ carts }) => {
  const showCartWindow = useAppSelector((state) => state.cart.showCartWindow);
  const me = useAppSelector((state) => state.me.me);

  return (
    <div
      className={cn(
        `absolute right-0 top-10 bg-white shadow-lg transition-all ease-in-out duration-300`,
        showCartWindow
          ? 'opacity-100 block'
          : 'opacity-0 hidden group-hover:block group-hover:opacity-100'
      )}
    >
      <div className="text-lg min-w-[250px] font-semibold bg-[#29294d] p-2 text-white text-center">
        Cart Items
      </div>
      <div className="flex flex-col items-start rounded-sm max-h-[400px] overflow-y-auto">
        {carts?.map((cart) => {
          const price = cart?.product?.price_lists?.find(
            (price) =>
              price?.user_level === me?.account_detail?.level ||
              price?.user_level === 'DEFAULT'
          );

          return (
            <div
              key={cart?.documentId}
              className="flex border p-3 gap-3 justify-between w-full hover:bg-gray-50"
            >
              <div className="left w-14 h-14 overflow-hidden rounded-sm p-1">
                <Image
                  width={100}
                  height={100}
                  alt={cart?.product?.name || ''}
                  src={cart?.product?.images[0]?.url || '/no-product-image.jpg'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="right">
                <h4 className="text-sm font-medium w-[200px] text-wrap text-left">
                  {cart?.product?.name}
                </h4>
                <div className="mt-1 text-sm text-muted-foreground text-left">
                  Qty: {cart?.quantity}
                  <br />
                  {formatCurrency(
                    Number(
                      Number(price?.price?.toFixed(2)) * Number(cart?.quantity)
                    ),
                    'USD'
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {carts?.length === 0 && (
          <div className="p-4 text-center text-gray-500 w-full">
            Your cart is empty
          </div>
        )}
      </div>
    </div>
  );
};

export default CartNotification;
