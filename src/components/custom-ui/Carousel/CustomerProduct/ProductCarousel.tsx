'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ButtonGroup from './ButtonGroup';
import RightButton from './RightButton';
import { GetProductQuery } from '@/lib/gql/graphql';
import CustomDot from './CustomDot';

interface ImageCarouselProps {
  productData: GetProductQuery['getProduct'];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ productData }) => {
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

  const [index, setIndex] = useState<number>(0);

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
          {productData?.images.map((image, index) => (
            <div key={index} className="h-52 relative">
              <Image
                priority
                fill
                src={image?.url!}
                alt={
                  image?.alternativeText || image?.name || 'image of product'
                }
                className="object-contain object-center"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* tablet/desktop carousel */}
      <div className=" w-full relative h-full hidden md:block">
        <div className="w-32 h-12 bg-red-500 mx-auto"></div>

        <div className="mt-3">
          <div className="h-72 relative">
            <Image
              priority
              fill
              src={productData?.images[index]?.url!}
              alt={
                productData?.images[index]?.alternativeText ||
                productData?.images[index]?.name ||
                'image of product'
              }
              className="object-contain object-center"
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
              {productData?.images?.map((image, i) => (
                <div
                  key={i}
                  className={`relative h-20 mr-2  rounded-xl ${index === i && 'border border-black'} cursor-pointer`}
                  onClick={() => setIndex(i)}
                >
                  <Image
                    priority
                    fill
                    src={image?.url!}
                    alt={
                      image?.alternativeText ||
                      image?.name ||
                      'image of product'
                    }
                    className="object-contain p-1 rounded-xl"
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

export default ImageCarousel;
