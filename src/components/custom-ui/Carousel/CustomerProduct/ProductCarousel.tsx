'use client';

import Image from 'next/image';
import React from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ButtonGroup from './ButtonGroup';

const ImageCarousel: React.FC = () => {
  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 1,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 1,
    },
    mobile: {
      breakpoint: {
        max: 640,
        min: 0,
      },
      items: 1,
    },
  };

  return (
    <div className="relative pb-8">
      <Carousel
        responsive={responsive}
        infinite={true}
        showDots={true}
        arrows={false}
        renderDotsOutside={true}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {new Array(3).fill('s').map((_, index) => (
          <div key={index} className="h-52 relative">
            <Image
              priority
              fill
              src={'/images/background/Weiheng Tianwu AIO-Mobile.png'}
              alt="product image"
              className="object-contain object-center"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
