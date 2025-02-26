import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PaymentProps {
  stepper: number;
  paymentOption?: any;
  handleIncrementStepper: () => void;
  handlePaymentOptionChange: (value: string) => void;
}

const Payment: React.FC<PaymentProps> = ({
  stepper,
  paymentOption,
  handleIncrementStepper,
  handlePaymentOptionChange,
}) => {
  return (
    <section>
      <div className="bg-blue-navy-blue py-3">
        <h1 className="text-lg font-bold ae-mobile-container px-2 md:px-12 text-white">
          Payment
        </h1>
      </div>
      <div className={`bg-white py-4 ${stepper < 3 ? 'hidden' : 'block'}`}>
        <div className="ae-mobile-container space-y-4">
          <div className="border border-blue-navy-blue rounded-xl p-2 md:mx-12">
            <h1 className="font-bold">Payment Method</h1>
            <RadioGroup
              className="space-y-1"
              onValueChange={handlePaymentOptionChange}
            >
              <div className="flex items-center justify-between border-b border-b-gray-300 pb-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Credit Card</Label>
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
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Bank Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-three" id="option-three" />
                <Label htmlFor="option-three">Account Credit</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="max-lg:space-y-4 lg:flex lg:gap-x-4 lg:mx-12">
            <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12 lg:mx-0">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-blue-navy-blue">Bill to:</h1>
                <div className="flex items-center gap-x-1 relative border-b border-black">
                  <p className="text-[12px]">Change Address</p>
                  <MoveRight className="w-4" />
                </div>
              </div>
              <div className="flex gap-x-2">
                <h1 className="font-bold">Fake Company Installs</h1>
                <p>-</p>
                <h1>123 Fake St, Springfield, NSW 2345</h1>
              </div>
            </div>

            {/* Card Details */}
            {paymentOption && (
              <div className="border border-blue-navy-blue rounded-xl p-2 space-y-2 md:mx-12 lg:mx-0">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold">Card Details</h1>
                  <Link href="/payment">
                    <div className="flex items-center gap-x-1 relative border-b border-black">
                      <p className="text-[12px]">Change Payment Method</p>
                      <MoveRight className="w-4" />
                    </div>
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h1>Frank Grimes</h1>
                    <p>Ending with 2684</p>
                    <p>Exp. 10/2026</p>
                  </div>
                  <div className="basis-3/12 flex items-center justify-center flex-col gap-y-2">
                    <Image
                      width={28}
                      height={24}
                      src="/images/logo/visa.png"
                      alt="visa logo"
                      className="w-7 h-6 border border-black"
                    />
                    <p className="text-[14px] text-center">1.2% Surcharge</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {stepper === 3 && (
        <div className="my-4">
          <div className="ae-mobile-container px-2 mt-4">
            <Button
              className="block mx-auto px-12 rounded-2xl bg-blue-navy-blue hover:bg-blue-navy-blue/90"
              onClick={handleIncrementStepper}
              disabled={!paymentOption}
            >
              <div className="md:flex md:gap-1">
                <p>Submit Order</p>
                <p className="hidden md:block">& Pay</p>
              </div>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Payment;
