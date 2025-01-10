'use client';
import { useState } from 'react';
import CheckoutHeader from '@/components/Checkout/CheckoutHeader';
import ReviewItems from './ReviewItems';
import ShippingDetails from './ShippingDetails';
import Payment from './Payment';
import { useQuery } from '@apollo/client';
import CART_OPERATIONS from '@/graphql/cart';
const CartDetails = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [stepper, setStepper] = useState<number>(1);
  const [radioValue, setRadioValue] = useState<string>('1');
  const [isShippingDelivery, setIsShippingDelivery] = useState<boolean>(true);
  const { data, loading, error } = useQuery(CART_OPERATIONS.Query.cartItems);
  const [voucherDetails, setVoucherDetails] = useState<{
    voucherCode: string;
    orderNotes: string;
  }>({ voucherCode: '', orderNotes: '' });

  const handleIncrementStepper = () => {
    setStepper((prev) => {
      if (prev <= 2) {
        return prev + 1;
      } else {
        return 3;
      }
    });
  };

  if (loading) return <p>Loading...</p>;

  if (!data) return <p>No data</p>;

  return (
    <div className="w-full h-auto">
      <CheckoutHeader stepper={stepper} />
      <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container py-4 ">
        Checkout
      </h1>

      <div className=" md:grid md:grid-cols-12 lg:w-[90vw] lg:mx-auto max-w-[1200px]">
        <div className="md:col-span-12 lg:col-span-8">
          {/* Review Items */}
          <ReviewItems
            cartItems={data.carts}
            stepper={stepper}
            // voucherDetails={voucherDetails}
            // setVoucherDetails={setVoucherDetails}
            setStepper={setStepper}
            onClickContinue={handleIncrementStepper}
          />

          {/* Shipping */}
          <ShippingDetails
            stepper={stepper}
            setStepper={setStepper}
            onClickContinue={handleIncrementStepper}
            date={date}
            setDate={setDate}
            radioValue={radioValue}
            setRadioValue={setRadioValue}
            isShippingDelivery={isShippingDelivery}
            setIsShippingDelivery={setIsShippingDelivery}
          />

          {/* Payment */}
          <Payment
            stepper={stepper}
            handleIncrementStepper={handleIncrementStepper}
          />
        </div>

        <div className="hidden lg:block md:col-span-4">
          <div className="bg-white ml-8">
            <h1 className="p-2 text-xl font-black text-white bg-black">
              Order Summary
            </h1>

            <div className="px-2 space-y-2 py-4">
              <div>
                <h1 className="font-semibold">Selected Location:</h1>
                <h2>Sydney</h2>
                <p className="text-xs">24/32-38 Belmore Rd, Punchbowl NSW </p>
              </div>
              <div className="h-0.5 w-full bg-yellow-aes-yellow" />
              <div>
                <h1 className="font-semibold">Shipping:</h1>
                <h2 className="text-sm">
                  Fake Company Installs 123 Fake St, Springfield, NSW 2345
                </h2>
                <p className="text-xs">
                  TNT Standard Shipping (3-4 Business Days)
                </p>
              </div>
              <div className="h-0.5 w-full bg-pink-lighter-pink" />

              <div className="flex justify-between items-center">
                <h1>Sub-total (ex. GST)</h1>
                <p>$3,270.60</p>
              </div>

              <div className="flex justify-between items-center">
                <h1>Delivery</h1>
                <p>$39.47</p>
              </div>

              <div className="flex justify-between items-center">
                <h1>Card Surcharge (1.2%)</h1>
                <p>$39.71</p>
              </div>

              <div className="h-0.5 w-full bg-blue-navy-blue" />

              <div className="flex justify-between items-center">
                <h1>GST</h1>
                <p>$334.98</p>
              </div>

              <div className="h-0.5 w-full bg-blue-navy-blue" />

              <div className="flex justify-between items-center">
                <h1 className="font-bold">
                  Total <span className="font-normal text-xs">(inc. GST)</span>
                </h1>
                <p className="font-bold">$3,684.76</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
