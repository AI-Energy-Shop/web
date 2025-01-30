import React from 'react';
import Image from 'next/image';

interface BrandItemProps {
  name: string;
  logo: string;
}

const BrandItem: React.FC<BrandItemProps> = ({ name, logo }) => {
  return (
    <div key={name} className="w-full h-8 flex items-center justify-center">
      {/* {logo ? (
        <Image
          src={logo}
          alt={name}
          width={120}
          height={32}
          className="h-full w-auto object-contain"
        />
      ) : (
        <h2>{name}</h2>
      )} */}
      <h2 className='text-3xl'>{name}</h2>
    </div>
  );
};

export default BrandItem;
