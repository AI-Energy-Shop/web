"use client";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imageData from "@/data/banner_images.json";
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

type ImageCarouselData = {
  attributes: {
    title: string;
    createdAt: string;
    url: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
  id: number;
};

interface ImageCarouselProps {
  data: ImageCarouselData[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ data }) => {
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
        {imageData.map((item, index) => (
          <Image
            priority
            alt={""}
            key={index}
            width={1000}
            height={1000}
            className="block w-full m-auto"
            // src={`${item.attributes.url}`}
            src={item.img}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
