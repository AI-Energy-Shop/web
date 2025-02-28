import CheckoutHeader from '@/components/Checkout/CheckoutHeader';
import Payment from '@/components/Checkout/Payment';
import ReviewItems from '@/components/Checkout/ReviewItems';
import ShippingDetails from '@/components/Checkout/ShippingDetails';
async function CheckoutPage() {
  return (
    <main className="bg-yellow-light-yellow pb-12">
      <CheckoutHeader />
      <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container py-4">
        Checkout
      </h1>

      <div className="md:grid md:grid-cols-12 lg:w-[90vw] lg:mx-auto max-w-[1200px]">
        <div className="md:col-span-12 lg:col-span-8">
          <ReviewItems />

          <ShippingDetails />

          <Payment  />
        </div>

        {/* <div className="hidden lg:block md:col-span-4">
          <OrderSummary
            shippingDetails={shippingDetails}
            shippingFee={formatCurrency(deliveryFee, 'USD')}
            cardSubCharge={formatCurrency(
              shippingDetails?.paymentOption?.price || 0.0,
              'USD'
            )}
            gst={formatCurrency(totalGst, 'USD')}
            subtotal={formatCurrency(subtotal, 'USD')}
            total={formatCurrency(total, 'USD')}
          />
        </div> */}
      </div>

      {/* <ModalWrapper
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        description="You are about to remove this item from your cart."
        message="Are you sure you want to remove this item from your cart?"
      /> */}
    </main>
  );
}

export default CheckoutPage;
