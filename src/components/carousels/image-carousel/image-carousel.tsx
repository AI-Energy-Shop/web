'use client';
import useBreakpoint from '@/hooks/useBreakpoints';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomDot } from './custom-dot';

interface ImageCarouselProps {
  slides: {
    id: string;
    description: string;
    link: string;
    title: string;
    type: string;
    __typename: string;
    image: {
      alternativeText: string;
      name: string;
      url: string;
      __typename: string;
    };
  }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ slides }) => {
  const currentBreakpoint = useBreakpoint();

  const TABLET_BREAKPOINT = 768;
  const DESKTOP_BREAKPOINT = 1024;

  // const MOBILE = 'MOBILE';
  const TABLET = 'TABLET';
  const DESKTOP = 'DESKTOP';
  return (
    <div className="h-[75vw] md:h-[44.44vw] lg:h-[33.33vw] lg:max-h-[400px] relative">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={4000}
        centerMode={false}
        containerClass="h-full"
        focusOnSelect={false}
        infinite={true}
        keyBoardControl={false}
        minimumTouchDrag={80}
        pauseOnHover={true}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={true}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1023,
              min: 768,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 767,
              min: 0,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay={true}
        slidesToSlide={1}
        showDots={true}
        dotListClass="py-5 bottom-[5rem]"
        customDot={<CustomDot />}
      >
        {slides?.map?.((item) => {
          {
            /* DESKTOP */
          }
          if (currentBreakpoint < TABLET_BREAKPOINT) {
            return (
              <div key={item.id} className="h-auto w-full relative">
                <Image
                  priority
                  fill
                  width={1920}
                  height={1080}
                  alt={item.image?.alternativeText || ''}
                  className="object-cover object-center"
                  src={item.image?.url || '/no-product-image.jpg'}
                  sizes="(max-width: 1920px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            );
          }

          /* TABLET | IPAD */
          if (
            currentBreakpoint > TABLET_BREAKPOINT &&
            currentBreakpoint < DESKTOP_BREAKPOINT
          ) {
            return (
              <div key={item.id} className="h-[44.44vw] relative">
                <Image
                  priority
                  fill
                  className="object-cover object-center"
                  src={item.image?.url || '/no-product-image.jpg'}
                  alt={item.image?.alternativeText || ''}
                />
              </div>
            );
          }

          /* DESKTOP | WIDESCREEN */
          if (
            currentBreakpoint >= 1024 &&
            (item?.type === TABLET || item?.type === DESKTOP)
          ) {
            return (
              <div key={item.id} className="h-[33.33vw] max-h-[400px] relative">
                <Image
                  priority
                  fill
                  className="object-cover object-center"
                  src={item.image?.url || '/no-product-image.jpg'}
                  alt={item.image?.alternativeText || ''}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            );
          }
        })}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
