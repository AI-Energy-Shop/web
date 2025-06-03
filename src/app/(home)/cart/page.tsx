export const dynamic = 'force-dynamic';

import { getCartProductQuantity } from '@/app/actions/cart';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import OrderSummary from '@/components/checkout/order-summary';
import Payment from '@/components/checkout/payment';
import ReviewItems from '@/components/checkout/review-items';
import ShippingDetails from '@/components/checkout/shipping-details';
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
          <ReviewItems checkoutUserData={checkoutUserData} />

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
