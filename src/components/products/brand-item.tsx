import React from 'react';
import Image from 'next/image';

interface BrandItemProps {
  name: string;
  logo: string;
  alt: string;
  id?: string;
  onClick?: () => void;
}

const BrandItem: React.FC<BrandItemProps> = ({
  name,
  logo,
  alt,
  id,
  onClick,
}) => {
  return (
    <div
      key={id}
      title={name}
      onClick={onClick}
      className="w-[120px] h-auto flex items-center justify-center cursor-pointer overflow-hidden"
    >
      {logo && (
        <Image
          priority
          alt={alt}
          src={logo || '/no-product-image.jpg'}
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
};

export default BrandItem;
