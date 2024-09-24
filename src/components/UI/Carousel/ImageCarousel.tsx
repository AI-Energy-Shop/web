"use client";
import { BannerImages } from "@/libs/types";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CustomDot = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    index,
    active,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.

  return (
    <button
      className={`h-2 w-2 bg-slate-400 mx-1 my-3 rounded-lg ${
        active ? "w-6" : ""
      }`}
      onClick={() => onClick()}
    >
      {/* {React.Children.toArray(imageData)[index]} */}
    </button>
  );
};

interface ImageCarouselProps {
  desktopImages?: BannerImages[]; //Optional
  tabletImages?: BannerImages[]; //Optional
  mobileImages?: BannerImages[]; //Optional
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  desktopImages,
  tabletImages,
  mobileImages,
}) => {
  return (
    <div className="h-full w-full relative overflow-hidden">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={3000}
        centerMode={false}
        className="carousel w-full h-full mx-auto"
        containerClass="w-full h-full container block"
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
        {mobileImages && mobileImages.length > 0 && (
          <div className="w-full h-full md:hidden lg:hidden">
            {mobileImages.map((item) => {
              return (
                <Image
                  priority
                  width={1000}
                  height={1000}
                  key={item.id}
                  className="block w-full m-auto"
                  src={item.image.data.attributes.url}
                  alt={item.image.data.attributes.alternativeText || ""}
                />
              );
            })}
          </div>
        )}

        {tabletImages && tabletImages.length > 0 && (
          <div className="w-full h-full hidden md:block lg:hidden">
            {tabletImages.map((item) => {
              return (
                <Image
                  priority
                  width={1000}
                  height={1000}
                  key={item.id}
                  className="block w-full m-auto"
                  src={item.image.data.attributes.url}
                  alt={item.image.data.attributes.alternativeText || ""}
                />
              );
            })}
          </div>
        )}

        {desktopImages && desktopImages.length > 0 && (
          <div className="w-full h-full hidden md:hidden lg:block">
            {desktopImages.map((item) => {
              return (
                <Image
                  priority
                  width={1000}
                  height={1000}
                  key={item.id}
                  className="block w-full m-auto"
                  src={item.image.data.attributes.url}
                  alt={item.image.data.attributes.alternativeText || ""}
                />
              );
            })}
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
