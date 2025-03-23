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
import CustomButton from './CustomButton';
import CustomDot from './CustomDot';
import useMe from '@/hooks/useMe';
import { useQuery } from '@apollo/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { firaSans, muktaVaani } from '@/app/font';
import PRODUCT_OPERATIONS from '@/graphql/products';

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
    partialVisibilityGutter: 10,
  },
};

interface ProductRecoCarouselProps {
  relatedProductType?: string | null;
}

function ProductRecoCarousel({ relatedProductType }: ProductRecoCarouselProps) {
  const { me } = useMe();

  const { data, loading } = useQuery(PRODUCT_OPERATIONS.Query.products, {
    variables: {
      filters: {
        category: {
          slug: {
            contains: relatedProductType,
          },
        },
      },
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Mobile Carousel */}
      <div className="md:hidden relative pb-4">
        <Carousel
          responsive={responsive}
          partialVisible
          arrows={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          customDot={<CustomDot />}
          showDots
          renderDotsOutside
          containerClass="carousel-container"
          itemClass=" w-[45.5%] px-2"
        >
          {data?.products.map?.((item, index) => {
            const itemPrice = item?.price_lists.find(
              (price) => price?.user_level === me?.account_detail?.level
            );

            return (
              <Card key={index} className="p-3">
                <CardHeader className="p-0 w-3/4 mx-auto">
                  <div className="h-28 relative">
                    <Image
                      fill
                      loading="lazy"
                      alt="product image"
                      src={item?.images[0]?.url || ''}
                      className="object-contain object-center"
                    />
                  </div>
                </CardHeader>
                <CardContent className={`${firaSans.className} p-0 mt-2`}>
                  <h1 className="font-medium">{item?.name}</h1>
                  <h2 className="font-light text-[14px]">{item?.model}</h2>
                  <h3
                    className={`${muktaVaani.className} font-medium text-[10px] line-through mt-2`}
                  >
                    ${itemPrice?.price?.toFixed(2)}
                  </h3>
                  <h3 className={`${muktaVaani.className} font-medium`}>
                    <span>
                      $
                      {itemPrice?.sale_price
                        ? itemPrice?.sale_price?.toFixed(2)
                        : itemPrice?.price?.toFixed(2)}
                    </span>
                    <span className="text-[10px]">ex.GST</span>
                  </h3>
                </CardContent>
                <CardFooter className="block p-0 mt-2 ">
                  <div className="flex flex-1 border border-black h-8">
                    <div
                      role="button"
                      className="flex-2 flex items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                    >
                      <Minus />
                    </div>
                    <Input
                      className={`${muktaVaani.className} flex-3 h-full text-center no-spinner`}
                      type="number"
                    />

                    <div
                      role="button"
                      className="flex-2 flex items-center justify-center bg-gray-200 hover:bg-gray-200/90 cursor-pointer"
                    >
                      <Plus />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-navy-blue hover:bg-blue-navy-blue/90 rounded-xl font-bold text-[14px] mt-1">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </Carousel>
      </div>

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
          {data?.products?.map((item, index) => {
            const itemPrice = item?.price_lists.find(
              (price) => price?.user_level === me?.account_detail?.level
            );

            return (
              <Card key={index} className="p-4">
                <CardHeader className="p-0 w-[75%] mx-auto mb-8">
                  <div className="h-32 relative">
                    <Image
                      fill
                      loading="lazy"
                      alt="product image"
                      src={item?.images[0]?.url || ''}
                      className="object-contain object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className={`p-0 ${firaSans.className}`}>
                  <h1 className="font-medium">{item?.name}</h1>
                  <h2 className="font-light text-sm mb-3">{item?.model}</h2>
                  <h3
                    className={`text-sm line-through font-medium ${muktaVaani.className}`}
                  >
                    ${itemPrice?.price?.toFixed(2)}
                  </h3>
                  <h3 className={`${muktaVaani.className} font-medium mb-4`}>
                    <span className="text-xl">
                      $
                      {itemPrice?.sale_price
                        ? itemPrice?.sale_price?.toFixed(2)
                        : itemPrice?.price?.toFixed(2)}
                    </span>
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
                    <Input
                      className="flex-1 h-full text-center no-spinner"
                      type="number"
                    />

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
