"use client";
import { useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "@react-hook/media-query";

const Slider = () => {
  const mobileImages = [
    {
      path: "/images/background/DAH-Banner-Mobile.jpg",
      width: 1920,
      height: 1080,
      sizes: "(min-width: 2040px) 1920px, calc(94.19vw + 17px)",
      quality: 100,
    },
    {
      path: "/images/background/eCactus-Promo-Banner-Mobile.jpg",
      width: 800,
      height: 600,
      sizes: "(min-width: 1024px) 800px, 100vw",
      quality: 100,
    },
    {
      path: "/images/background/Sunpro_Half_Dots-Mobile.png",
      width: 1200,
      height: 800,
      sizes: "(min-width: 1440px) 1200px, 100vw",
      quality: 100,
    },
    {
      path: "/images/background/Weiheng Tianwu AIO-Mobile.png",
      width: 1200,
      height: 800,
      sizes: "(min-width: 1440px) 1200px, 100vw",
      quality: 100,
    },
    // Add more image objects here
    // mobile image objects
  ];

  const tabletDesktopImages = [
    {
      path: "/images/background/DAH-Banner-Desktop-Tablet.jpg",
      width: 1920,
      height: 1080,
      sizes: "(min-width: 2040px) 1920px, calc(94.19vw + 17px)",
      quality: 100,
    },
    {
      path: "/images/background/eCactus-Promo-Banner-Desktop+Tablet.jpg",
      width: 800,
      height: 600,
      sizes: "(min-width: 1024px) 800px, 100vw",
      quality: 100,
    },
    {
      path: "/images/background/Sunpro_Half_Dots-Desktop+Tablet.png",
      width: 1200,
      height: 800,
      sizes: "(min-width: 1440px) 1200px, 100vw",
      quality: 100,
    },
    {
      path: "/images/background/Weiheng Tianwu AIO-Desktop+Tablet.png",
      width: 1200,
      height: 800,
      sizes: "(min-width: 1440px) 1200px, 100vw",
      quality: 100,
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const isTabletDesktop = useMediaQuery("(min-width: 768px)");

  const handleNext = () => {
    setCurrentImage((prevImage) =>
      prevImage ===
      (isTabletDesktop ? tabletDesktopImages.length : mobileImages.length) - 1
        ? 0
        : prevImage + 1
    );
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0
        ? (isTabletDesktop ? tabletDesktopImages.length : mobileImages.length) -
          1
        : prevImage - 1
    );
  };

  const images = isTabletDesktop ? tabletDesktopImages : mobileImages;

  return (
    <div className="relative">
      <div className="flex items-center justify-center">
        {/* <button className="absolute left-0 -1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full" onClick={handlePrev}>
                    Prev
                </button>
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full" onClick={handleNext}>
                    Next
                </button> */}
        <Image
          src={images[currentImage].path}
          alt="hero"
          width={images[currentImage].width}
          height={images[currentImage].height}
          quality={images[currentImage].quality}
          sizes={images[currentImage].sizes}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Slider;
