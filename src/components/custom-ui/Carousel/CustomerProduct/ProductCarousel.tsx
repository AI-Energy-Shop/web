'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ButtonGroup from './ButtonGroup';
import RightButton from './RightButton';

const ImageCarousel: React.FC = () => {
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

  const [arr, setArr] = useState<number>(0);

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
        >
          {new Array(3).fill(0).map((_, index) => (
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

      {/* tablet/desktop carousel */}
      <div className=" w-full relative h-full hidden md:block">
        <div className="w-32 h-12 bg-red-500 mx-auto"></div>

        <div className="mt-3">
          <div className="h-72 relative">
            <Image
              priority
              fill
              src={'/images/background/Weiheng Tianwu AIO-Mobile.png'}
              alt="product image"
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
              {new Array(24).fill(0).map((_, i) => (
                <div
                  key={i}
                  className={`relative h-20 mr-2  rounded-xl ${arr === i && 'border border-black'}`}
                  onClick={() => setArr(i)}
                >
                  <Image
                    priority
                    fill
                    src={'/images/background/Weiheng Tianwu AIO-Mobile.png'}
                    alt="product image"
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
