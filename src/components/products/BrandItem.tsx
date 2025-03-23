import React from 'react';
import Image from 'next/image';

interface BrandItemProps {
  name: string;
  logo: string;
  alt: string;
}

const BrandItem: React.FC<BrandItemProps> = ({ name, logo, alt }) => {
  return (
    <div key={name} className="w-full h-8 flex items-center justify-center">
      {logo && (
        <Image
          src={logo}
          alt={alt}
          width={120}
          height={32}
          className="h-auto w-auto object-contain"
        />
      )}
      {/* <h2 className="text-3xl">{name}</h2> */}
    </div>
  );
};

export default BrandItem;
