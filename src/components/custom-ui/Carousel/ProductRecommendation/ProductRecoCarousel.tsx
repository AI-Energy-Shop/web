'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { firaSans, muktaVaani } from '@/app/font';
import CustomButton from './CustomButton';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1023, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  },
};

function ProductRecoCarousel() {
  return (
    <>
      {/* Mobile Carousel */}
      <Carousel
        responsive={responsive}
        arrows={false}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="md:hidden"
      >
        {new Array(10).fill(0).map((_, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <div className="h-44 relative">
                  <Image
                    priority
                    fill
                    src={'/images/background/Weiheng Tianwu AIO-Mobile.png'}
                    alt="product image"
                    className="object-contain object-center"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <h1 className="text-xl font-bold">
                  Solplanet 6kW S-G2 Series Single Phase Inverter
                </h1>
                <h2 className="font-thin text-lg italic">ASW6000-S-G2</h2>
                <h3 className="text-sm line-through">$1250.20</h3>
                <h3 className="font-semibold text-lg">
                  $1,160.00 <span className="text-sm">ex.GST</span>
                </h3>
              </CardContent>
              <CardFooter className="block space-y-4">
                <div className="flex flex-1 border border-black h-8">
                  <div
                    role="button"
                    className="flex-2 flex items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                  >
                    <Minus />
                  </div>
                  <div className="flex-3 border border-x-black flex items-center justify-center">
                    <p>1</p>
                  </div>
                  <div
                    role="button"
                    className="flex-2 flex items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                  >
                    <Plus />
                  </div>
                </div>
                <Button className="w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </Carousel>

      {/* Tablet/Desktop Carousel */}
      <div className="hidden md:block relative">
        <Carousel
          responsive={responsive}
          arrows={false}
          swipeable={true}
          draggable={true}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          renderButtonGroupOutside={true}
          customButtonGroup={<CustomButton />}
          itemClass="w-[21.5%] px-2"
          className="z-10"
        >
          {new Array(25).fill(0).map((_, index) => {
            return (
              <Card key={index} className="p-4">
                <CardHeader className="p-0 w-[75%] mx-auto mb-8">
                  <div className="h-32 relative">
                    <Image
                      priority
                      fill
                      src={'/images/background/Weiheng Tianwu AIO-Mobile.png'}
                      alt="product image"
                      className="object-contain object-center"
                    />
                  </div>
                </CardHeader>
                <CardContent className={`p-0 ${firaSans.className}`}>
                  <h1 className="font-medium">
                    Solplanet 6kW S-G2 Series Single Phase Inverter
                  </h1>
                  <h2 className="font-light text-sm mb-3">ASW6000-S-G2</h2>
                  <h3
                    className={`text-sm line-through font-medium ${muktaVaani.className}`}
                  >
                    $1250.20
                  </h3>
                  <h3 className={`${muktaVaani.className} font-medium mb-4`}>
                    <span className="text-xl">$1,160</span>
                    <span>.00 </span>
                    <span className="text-xs">ex.GST</span>
                  </h3>
                </CardContent>
                <CardFooter className="block space-y-4 p-0">
                  <div className="flex flex-1 border border-black h-8">
                    <div
                      role="button"
                      className="w-9 flex  items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                    >
                      <Minus />
                    </div>
                    <div className="flex-1 border border-x-black flex items-center justify-center">
                      <p>1</p>
                    </div>
                    <div
                      role="button"
                      className="w-9 flex items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                    >
                      <Plus />
                    </div>
                  </div>
                  <Button className="w-full py-6 bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-full font-bold">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default ProductRecoCarousel;