import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { muktaVaani, firaSans } from '@/font/font';
const Logo = () => {
  return (
    <Link href="/" passHref>
      <div className="w-[100px] flex flex-col items-center justify-between">
        <div className="relative w-10 h-10 overflow-hidden">
          <Image
            width={100}
            height={100}
            alt="logo image"
            src="/images/logo/AES-Logomark_750px-M.png"
            className="w-full h-full object-contain"
            priority
          />
        </div>
        <p
          className={` ${muktaVaani.className} text-[10px] text-purple-purp-aes font-black text-center italic`}
        >
          AI ENERGY SHOP
        </p>
      </div>
    </Link>
  );
};

export default Logo;
