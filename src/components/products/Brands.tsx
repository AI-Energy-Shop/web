'use client';

import React from 'react';
import BrandItem from './BrandItem';
import { Skeleton } from '../ui/skeleton';
import Carousel from 'react-multi-carousel';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useProductFilter from '@/hooks/useProductFilter';
interface BrandsProps {
  selectedBrands?: string[];
}

const Brands: React.FC<BrandsProps> = ({ selectedBrands }) => {
  const { products, handleBrandClick } = useProductFilter();

  const uniqueBrands = React.useMemo(() => {
    if (!products) return [];

    const brandsMap = new Map();
    products.forEach((product) => {
      if (product?.brand?.documentId) {
        brandsMap.set(product.brand.documentId, product.brand);
      }
    });

    return Array.from(brandsMap.values());
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="mb-8 h-[100px]">
        <h1 className="text-2xl font-bold text-center mb-4">Brands</h1>
        <div className="w-full h-[100px] grid grid-cols-8 gap-5">
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
          <Skeleton className="w-full h-[100px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="brands mb-8 h-[100px]">
      <h1 className="text-2xl font-bold text-center mb-4">
        {selectedBrands && selectedBrands.length > 1 ? 'Brands' : 'Brand'}
      </h1>

      <Carousel
        additionalTransfrom={0}
        arrows={true}
        autoPlay={false}
        centerMode={true}
        className="carousel-container"
        containerClass="container-with-dots items-center justify-center"
        customLeftArrow={
          <Button variant="ghost" size="icon" className="absolute left-0">
            <ChevronLeft size={50} />
          </Button>
        }
        customRightArrow={
          <Button variant="ghost" size="icon" className="absolute right-0">
            <ChevronRight size={50} />
          </Button>
        }
        dotListClass=""
        itemClass="flex items-center justify-center cursor-pointer overflow-hidden"
        sliderClass="gap-10 items-center justify-center"
        draggable
        focusOnSelect={false}
        infinite={true}
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 8,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 5,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 2,
            partialVisibilityGutter: 10,
          },
        }}
        rtl={true}
        rewind={false}
        rewindWithAnimation={false}
        shouldResetAutoplay
        showDots={false}
        slidesToSlide={1}
        swipeable
      >
        {uniqueBrands?.map((brand) => {
          return (
            <BrandItem
              key={brand?.documentId}
              id={brand?.documentId}
              name={`${brand?.name}`}
              logo={`${brand?.image?.url}`}
              alt={`${brand?.name}`}
              onClick={() => handleBrandClick(brand?.url || '')}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Brands;
