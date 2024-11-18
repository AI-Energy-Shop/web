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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 30,
  },
  'semi-mobile': {
    breakpoint: { max: 768, min: 640 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 30,
  },
};

function ProductRecoCarousel() {
  return (
    <Carousel
      responsive={responsive}
      arrows={false}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      partialVisible
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="px-2"
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
  );
}

export default ProductRecoCarousel;
