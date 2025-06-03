import Payment from '@/components/checkout/payment';
import Reviews from '@/components/checkout/review/reviews';
import { getCartProductQuantity } from '@/app/actions/cart';
import OrderSummary from '@/components/checkout/order-summary';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import ShippingDetails from '@/components/checkout/shipping-details';

async function CheckoutPage() {
  // const checkoutUserData = await getCartProductQuantity();

  return (
    <main className="bg-light-yellow pb-12 relative">
      <CheckoutHeader />
      <div className="md:grid md:grid-cols-12 lg:w-[90vw] lg:mx-auto max-w-[1200px]">
        <div className="md:col-span-12 lg:col-span-8">
          <Reviews />

          {/* <ShippingDetails checkoutUserData={checkoutUserData} /> */}

          {/* <Payment checkoutUserData={checkoutUserData} /> */}
        </div>

        <div className="hidden lg:block md:col-span-4">
          {/* <OrderSummary checkoutUserData={checkoutUserData} /> */}
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;
