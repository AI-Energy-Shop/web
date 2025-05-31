'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ButtonGroup from './ButtonGroup';
import RightButton from './RightButton';
import { GetStoreProductQuery } from '@/lib/gql/graphql';
import CustomDot from './CustomDot';

interface ProductCarouselProps {
  product: GetStoreProductQuery['getStoreProduct'];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ product }) => {
  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 4,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 768,
      },
      items: 4,
    },
    mobile: {
      breakpoint: {
        max: 768,
        min: 0,
      },
      items: 1,
    },
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const firstImage = product?.images.at(0);

  return (
    <>
      {/* mobile carousel */}
      <div className="relative md:hidden pb-6">
        <Carousel
          responsive={responsive}
          infinite={true}
          showDots={true}
          arrows={false}
          renderDotsOutside={true}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
          customDot={<CustomDot />}
          dotListClass="space-x-1 top-[213px]"
        >
          {firstImage ? (
            <div className="h-52 relative">
              <Image
                fill
                loading="lazy"
                src={`${firstImage?.url}`}
                alt={`${firstImage?.alternativeText}`}
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ) : (
            <div className="h-52 relative">
              <Image
                fill
                loading="lazy"
                src="/no-product-image.jpg"
                alt="no product image"
                className="object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          )}
        </Carousel>
      </div>

      {/* tablet/desktop carousel */}
      <div className=" w-full relative h-full hidden md:block">
        <div className="w-32 h-12 mx-auto">
          {product?.brand?.image?.url && (
            <Image
              width={128}
              height={48}
              loading="lazy"
              src={`${product?.brand?.image?.url}`}
              className="object-contain object-center w-full h-full"
              alt={`${product?.brand?.image?.alternativeText}`}
            />
          )}
        </div>

        <div className="mt-3">
          <div className="h-72 relative">
            <Image
              priority
              fill
              src={`${firstImage?.url}`}
              alt={`${firstImage?.alternativeText}`}
              className="object-contain object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          <div className="relative mt-4 pr-4">
            <Carousel
              responsive={responsive}
              arrows={false}
              renderButtonGroupOutside={true}
              customButtonGroup={<RightButton />}
              className="overflow-hidden"
            >
              {product?.images.map((image, i) => (
                <div
                  key={i}
                  className={`relative h-20 mr-2  rounded-xl ${selectedImage === i && 'border border-black'} cursor-pointer`}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image
                    fill
                    loading="lazy"
                    src={`${image?.url}`}
                    alt={`${image?.alternativeText}`}
                    className="object-contain p-1 rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
