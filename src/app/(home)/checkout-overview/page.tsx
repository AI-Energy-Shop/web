'use client';
import OrderSummary from '@/components/CheckoutOverview/orderSummary';
import PaymentMethod from '@/components/CheckoutOverview/paymentMethod';
import PlaceOrder from '@/components/CheckoutOverview/placeOrder';
import PriceDetails from '@/components/CheckoutOverview/priceDetails';
import ShippingDetails from '@/components/CheckoutOverview/shippingDetails';
import { useCheckout } from '@/hooks/useCheckout';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function CheckoutOverview() {
  const router = useRouter();
  const { paymentMethod } = useCheckout();

  // useEffect(() => {
  //   if (!paymentMethod) {
  //     router.push('/cart');
  //   }
  // }, [paymentMethod, router]);

  return (
    <main className="ae-mobile-container ae-non-mobile-container py-4 space-y-4 min-h-screen">
      <h1 className="text-lg font-semibold">Checkout Overview</h1>

      <div className="sm:flex sm:gap-x-4">
        <div className="space-y-4 sm:flex-2">
          <OrderSummary />
          <ShippingDetails />
          <PaymentMethod />
        </div>
        <div className="sm:flex-1 space-y-4">
          <PriceDetails />
          <PlaceOrder />
        </div>
      </div>
    </main>
  );
}

export default CheckoutOverview;
