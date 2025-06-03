import { GetStoreProductQuery } from '@/lib/gql/graphql';
import Image from 'next/image';
import React from 'react';

interface CardImageProps {
  product: GetStoreProductQuery['getStoreProduct'];
}

const CardImage = ({ product }: CardImageProps) => {
  const images = product?.images;

  const fallbackImage = '/no-product-image.jpg';
  const fallbackAlt = 'product image';

  return (
    <div className="aspect-[3/4] relative bg-[#e6e6e6]">
      {images?.map((image, i) => {
        if (i === 0) {
          return (
            <Image
              fill
              priority
              key={image?.documentId}
              src={image?.url || fallbackImage}
              alt={image?.name || fallbackAlt}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain w-auto h-auto bg-transparent mix-blend-multiply"
            />
          );
        }
      })}
    </div>
  );
};

export default CardImage;
