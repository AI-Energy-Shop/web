'use client';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
const CheckoutHeader = () => {
  const step = useSelector((state: RootState) => state.cart.paymentStep);

  return (
    <header className="bg-white">
      <section className="h-28 relative ae-mobile-container ae-non-mobile-container">
        {/* <div className="absolute w-10 h-10 left-1/2 transform -translate-x-1/2 top-2">
          <Image
            loading="eager"
            width={40}
            height={40}
            src="/images/logo/AES-Logomark_750px-M.png"
            alt="ai energy shop"
            className="w-auto h-auto block mx-auto"
          />
          <p className="text-[10px] text-purple-purp-aes font-black tracking-widest">
            AI ENERGY SHOP
          </p>
        </div> */}
        <div className="text-[14px] absolute left-0 top-2 flex items-center gap-x-1 border border-black py-2 pr-2 rounded-lg">
          <ChevronLeft className="w-5 h-5" />
          <Link href="/products" className="md:flex md:gap-x-1">
            Continue Shopping
          </Link>
        </div>
        <div
          className={`absolute h-0.5 w-full bottom-5 left-0 bg-gradient-to-r from-yellow-aes-yellow
            ${step < 2 ? 'from-5% via-gray-300 via-30%' : 'from-5% via-pink-lighter-pink via-30%'}
            ${step === 3 ? 'to-blue-navy-blue to-80%' : 'to-gray-300 to-80%'}   
              `}
        >
          <div className="relative">
            <span
              className={`absolute h-5 w-5 rounded-full -top-2 left-0 ${step > 0 ? 'bg-yellow-aes-yellow' : 'bg-gray-300'}`}
            />
            <span
              className={`absolute h-5 w-5 rounded-full -top-2 left-1/2 transform -translate-x-1/2 ${step > 1 ? 'bg-pink-lighter-pink ' : 'bg-gray-300'}`}
            />
            <span
              className={`absolute  h-5 w-5 rounded-full -top-2 right-0 ${step > 2 ? 'bg-blue-navy-blue' : 'bg-gray-300'}`}
            />
          </div>
        </div>
      </section>
      <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container py-4">
        Checkout
      </h1>
    </header>
  );
};

export default CheckoutHeader;
