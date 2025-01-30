import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  image: string;
  imageAlt: string;
  name: string;
  model: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  imageAlt,
  name,
  model,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="aspect-[3/4] relative mb-4">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-medium text-sm mb-1">{name}</h3>
      <p className="text-sm text-gray-500">{model}</p>
    </div>
  );
};

export default ProductCard;
