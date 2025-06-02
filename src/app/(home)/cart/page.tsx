export const dynamic = 'force-dynamic';

import { getCartProductQuantity } from '@/app/actions/cart';
import CheckoutHeader from '@/components/Checkout/CheckoutHeader';
import OrderSummary from '@/components/Checkout/OrderSummary';
import Payment from '@/components/Checkout/Payment';
import ReviewItems from '@/components/Checkout/ReviewItems';
import ShippingDetails from '@/components/Checkout/ShippingDetails';
async function CheckoutPage() {
  const checkoutUserData = await getCartProductQuantity();

  return (
    <main className="bg-light-yellow pb-12 relative">
      <CheckoutHeader />
      <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container py-4">
        Checkout
      </h1>

      <div className="md:grid md:grid-cols-12 lg:w-[90vw] lg:mx-auto max-w-[1200px]">
        <div className="md:col-span-12 lg:col-span-8">
          <ReviewItems />

          <ShippingDetails checkoutUserData={checkoutUserData} />

          <Payment checkoutUserData={checkoutUserData} />
        </div>

        <div className="hidden lg:block md:col-span-4">
          <OrderSummary checkoutUserData={checkoutUserData} />
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
