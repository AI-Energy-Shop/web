"use client";
import { BannerImages } from "@/libs/types";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useBreakpoint from "./hooks/useBreakpoints";
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
  bannerImages: BannerImages[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ bannerImages }) => {
  const brkp = useBreakpoint();
  console.log(bannerImages);
  return (
    <div className="image-carousel h-full w-full relative overflow-hidden">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={4000}
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
        {bannerImages?.map((item) => {
          if (item.image_type === "MOBILE" && brkp < 640) {
            return (
              <Image
                priority
                width={1000}
                height={1000}
                key={item.id}
                className={`w-full m-auto ${
                  item.image_type === "MOBILE" && "block md:hidden lg:hidden"
                }`}
                src={item.image.data.attributes.url}
                alt={item.image.data.attributes.alternativeText || ""}
              />
            );
          }
        })}
        {bannerImages?.map((item) => {
          if (item.image_type === "TABLET" && brkp > 768) {
            return (
              <Image
                priority
                width={1000}
                height={1000}
                key={item.id}
                className={`w-full m-auto ${
                  item.image_type === "TABLET" && "hidden md:block lg:hidden"
                }`}
                src={item.image.data.attributes.url}
                alt={item.image.data.attributes.alternativeText || ""}
              />
            );
          }
        })}
        {bannerImages?.map((item) => {
          if (item.image_type === "DESKTOP" && brkp > 1024) {
            return (
              <Image
                priority
                width={1000}
                height={1000}
                key={item.id}
                className={`w-full m-auto ${
                  item.image_type === "DESKTOP" && "hidden md:hidden lg:block"
                }`}
                src={item.image.data.attributes.url}
                alt={item.image.data.attributes.alternativeText || ""}
              />
            );
          }
        })}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
