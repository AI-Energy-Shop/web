import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { audiowide, muktaVaani } from '@/font/font';
import { cn } from '@/lib/utils';
const Logo = () => {
  return (
    <Link href="/" passHref>
      <div className="flex flex-col items-center justify-between">
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
          style={{
            width: '60px',
            fontWeight: 'bold',
            fontSize: '7px',
            lineHeight: '10px',
            letterSpacing: '0.1px',
          }}
          className={cn(
            muktaVaani.className,
            'text-[9px] text-purple-purp-aes text-center'
          )}
        >
          <span
            style={{
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: '7px',
              lineHeight: '10px',
              letterSpacing: '0.1px',
            }}
            className={cn(
              audiowide.className,
              'text-[9px] text-purple-purp-aes text-center'
            )}
          >
            A
          </span>{' '}
          I ENERGY SHOP
        </p>
      </div>
    </Link>
  );
};

export default Logo;
