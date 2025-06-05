'use client';
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import { useCheckout } from '@/hooks/useCheckout';
import { PaymentMethod } from '@/store/features/checkout';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as types from '@/lib/gql/graphql';
import CreditCardChangeDialog from './CardPayment/CreditCardChangeDialog';
import { CreditCard } from './CardPayment/Card';
import { checkShippingEligibility } from '@/utils/check-shipping-eligibility';

interface PaymentProps {
  checkoutUserData: types.GetCheckoutUserDataQuery;
}

const Payment: React.FC<PaymentProps> = ({ checkoutUserData }) => {
  const { paymentStep, carts } = useCart();
  const { paymentMethod, setPaymentMethod, card } = useCheckout();
  const [creditCardDialog, setCreditCardDialog] = useState<boolean>(false);

  const defaultCreditCard =
    checkoutUserData?.usersPermissionsUser?.creditCards?.find(
      (card) => card?.isDefault
    );

  const cardDataToDisplay = card || defaultCreditCard;

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
                    disabled={!checkShippingEligibility(carts)}
                  />
                  <Label
                    htmlFor="credit_card"
                    className={`flex items-center gap-2 ${!checkShippingEligibility(carts) ? 'cursor-not-allowed ' : 'cursor-pointer'}`}
                  >
                    <span
                      className={
                        !checkShippingEligibility(carts)
                          ? 'line-through text-gray-500'
                          : 'text-black'
                      }
                    >
                      Credit Card
                    </span>
                    {!checkShippingEligibility(carts) && (
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

          <CreditCardChangeDialog
            creditCardDialog={creditCardDialog}
            setCreditCardDialog={setCreditCardDialog}
            checkoutUserData={checkoutUserData}
          />
          {paymentMethod === types.Enum_Order_Paymentmethod.CreditCard && (
            <div className="md:mx-12 grid grid-cols-2">
              <div className="p-2 space-y-4 border border-blue-navy-blue rounded-xl col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold">Bill To:</h1>
                  <p
                    onClick={() => setCreditCardDialog(true)}
                    className="text-xs underline flex items-center cursor-pointer"
                  >
                    Change Payment Method <ArrowRight size={13} />
                  </p>
                </div>
                <CreditCard
                  brand={cardDataToDisplay?.brand || ''}
                  last4Char={cardDataToDisplay?.last4Char || ''}
                  expMonth={cardDataToDisplay?.expMonth || ''}
                  expYear={cardDataToDisplay?.expYear || ''}
                  isDefault={cardDataToDisplay?.isDefault || true}
                />
              </div>
            </div>
          )}
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
