'use client';
import React, { useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { PaymentMethod } from '@/store/features/checkout';
import Link from 'next/link';

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = ({}) => {
  const { paymentStep, isCartNeededManualQuote, carts } = useCart();
  const { paymentMethod, setPaymentMethod, setItems } = useCheckout();

  useEffect(() => {
    setItems(carts);
  }, [carts, setItems]);

  return (
    <section>
      <div className="bg-blue-navy-blue py-3">
        <h1 className="text-lg font-bold ae-mobile-container px-2 md:px-12 text-white">
          Payment
        </h1>
      </div>
      <div className={`bg-white py-4 ${paymentStep < 3 ? 'hidden' : 'block'}`}>
        <div className="ae-mobile-container space-y-4">
          <div className="border border-blue-navy-blue rounded-xl p-2 md:mx-12">
            <h1 className="font-bold">Payment Method</h1>
            <RadioGroup
              className="space-y-1"
              value={paymentMethod}
              onValueChange={(e) => setPaymentMethod(e as PaymentMethod)}
            >
              <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="credit_card"
                    id="credit_card"
                    disabled={isCartNeededManualQuote}
                  />
                  <Label
                    htmlFor="credit_card"
                    className={`flex items-center gap-2 ${isCartNeededManualQuote ? 'cursor-not-allowed ' : 'cursor-pointer'}`}
                  >
                    <span
                      className={
                        isCartNeededManualQuote
                          ? 'line-through text-gray-500'
                          : 'text-black'
                      }
                    >
                      Credit Card
                    </span>
                    {isCartNeededManualQuote && (
                      <span className="text-xs text-red-500">
                        (not available base in your cart items)
                      </span>
                    )}
                  </Label>
                </div>
                <div className="flex items-center justify-end gap-x-1">
                  <Image
                    width={28}
                    height={24}
                    src="/images/logo/visa.png"
                    alt="visa logo"
                    className="w-7 h-6 border border-black"
                  />
                  <Image
                    width={28}
                    height={24}
                    src="/images/logo/master-card.png"
                    alt="visa logo"
                    className="w-7 h-6 border border-black"
                  />
                  <Image
                    width={28}
                    height={24}
                    src="/images/logo/american-express.png"
                    alt="visa logo"
                    className="w-7 h-6 border border-black"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 border-b border-b-gray-300 pb-2">
                <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                <Label htmlFor="bank_transfer" className="cursor-pointer">
                  Bank Transfer
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="account_credit" id="account_credit" />
                <Label htmlFor="account_credit" className="cursor-pointer">
                  Account Credit
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {paymentStep === 3 && (
        <div className="my-4">
          <div className="ae-mobile-container px-2 mt-4">
            <Link href="/checkout-overview">
              <Button
                className="block mx-auto px-12 rounded-2xl bg-blue-navy-blue hover:bg-blue-navy-blue/90"
                disabled={!paymentMethod}
              >
                <div className="md:flex md:gap-1">
                  <p>Submit Order</p>
                  <p className="hidden md:block">& Pay</p>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Payment;
