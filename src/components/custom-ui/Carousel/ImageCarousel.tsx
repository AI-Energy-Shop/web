'use client';
import Image from 'next/image';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from './hooks/useBreakpoints';
import type { SliderSlide } from '@/lib/types';
import { CustomDot } from './CustomDot';

interface ImageCarouselProps {
  slides: SliderSlide[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ slides }) => {
  const currentBreakpoint = useBreakpoint();

  const TABLET_BREAKPOINT = 640;
  const DESKTOP_BREAKPOINT = 1024;

  return (
    <div className="h-[75vh] sm:h-[44.44vh] lg:h-[33.33vh] relative">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={4000}
        centerMode={false}
        containerClass="h-full"
        draggable={false}
        focusOnSelect={false}
        infinite={true}
        itemClass=""
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
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay={true}
        slidesToSlide={1}
        swipeable={false}
        // DOTS
        showDots={true}
        dotListClass="py-5 bottom-[5rem]"
        customDot={<CustomDot />}
      >
        {/* MOBILE */}
        {slides?.map((item) => {
          if (currentBreakpoint < TABLET_BREAKPOINT) {
            return (
              <Image
                priority
                width={2000}
                height={2000}
                key={item.id}
                className="h-[75vh] w-full m-auto object-cover"
                src={item.image.url}
                alt={item.image.alternativeText || ''}
              />
            );
          }

          /* TABLET | IPAD */
          if (
            currentBreakpoint > TABLET_BREAKPOINT &&
            currentBreakpoint < DESKTOP_BREAKPOINT
          ) {
            return (
              <div key={item.id} className="h-[240px] relative">
                <Image
                  priority
                  fill
                  className="object-cover object-center"
                  src={item.image.url}
                  alt={item.image.alternativeText || ''}
                />
              </div>
            );
          }

          /* DESKTOP | WIDESCREEN */
          if (currentBreakpoint > 1024) {
            return (
              <div key={item.id} className="h-[33.33vh] relative">
                <Image
                  priority
                  fill
                  className="object-fill h-full"
                  src={item.image.url}
                  alt={item.image.alternativeText || ''}
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
