import React from 'react';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

const CheckoutHeader = ({ stepper }: { stepper: number }) => {
  return (
    <header className="bg-white">
      <section className="h-28 relative ae-mobile-container ae-non-mobile-container">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-2">
          <Image
            width={40}
            height={40}
            src="/images/logo/AES-Logomark_750px-M.png"
            alt="ai energy shop"
            className="w-auto h-auto block mx-auto"
          />
          <p className="text-[10px] text-purple-purp-aes font-black tracking-widest">
            AI ENERGY SHOP
          </p>
        </div>
        <div className="text-[14px] absolute left-0 top-2 flex items-center gap-x-1 border border-black py-2 pr-2 rounded-lg">
          <ChevronLeft className="w-5 h-5" />
          <div className="md:flex md:gap-x-1">
            <p>Continue</p>
            <p>Shopping</p>
          </div>
        </div>
        <div
          className={`absolute h-0.5 w-full bottom-5 left-0 bg-gradient-to-r from-yellow-aes-yellow
            ${stepper < 2 ? 'from-5% via-gray-300 via-30%' : 'from-5% via-pink-lighter-pink via-30%'}
            ${stepper === 3 ? 'to-blue-navy-blue to-80%' : 'to-gray-300 to-80%'}   
              `}
        >
          <div className="relative">
            <span
              className={`absolute h-5 w-5 rounded-full -top-2 left-0 ${stepper > 0 ? 'bg-yellow-aes-yellow' : 'bg-gray-300'}`}
            />
            <span
              className={`absolute h-5 w-5 rounded-full -top-2 left-1/2 transform -translate-x-1/2 ${stepper > 1 ? 'bg-pink-lighter-pink ' : 'bg-gray-300'}`}
            />
            <span
              className={`absolute  h-5 w-5 rounded-full -top-2 right-0 ${stepper > 2 ? 'bg-blue-navy-blue' : 'bg-gray-300'}`}
            />
          </div>
        </div>
      </section>
    </header>
  );
};

export default CheckoutHeader;
