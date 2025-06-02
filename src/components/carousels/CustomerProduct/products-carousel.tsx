'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { GetStoreProductQuery, UploadFileQuery } from '@/lib/gql/graphql';
import {
  Carousel,
  CarouselItem,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { UploadFile } from '@/hooks/useProductDetails';

interface ProductCarouselProps {
  product: GetStoreProductQuery['getStoreProduct'];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState<
    UploadFileQuery['uploadFile']
  >(product?.images?.at?.(0));

  const firstImage = product?.images.at(0);

  React.useEffect(() => {
    if (firstImage) {
      setSelectedImage(selectedImage);
    }
  }, [selectedImage]);

  return (
    <>
      {/* mobile carousel */}
      <div className="relative md:hidden pb-6">
        <div className="h-72 relative">
          <Image
            fill
            priority
            src={`${selectedImage?.url}`}
            alt={`${selectedImage?.alternativeText}`}
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <Carousel>
          <CarouselContent>
            {product?.images?.map?.((image, i) => (
              <CarouselItem
                key={image?.documentId}
                onClick={() => setSelectedImage(image)}
                className={cn('basis-1/4')}
              >
                <div
                  className={cn(
                    'relative h-[90px] ',
                    `overflow-hidden cursor-pointer`,
                    `${selectedImage?.documentId === image?.documentId && 'border border-black rounded-sm'}`
                  )}
                >
                  <Image
                    fill
                    loading="lazy"
                    src={`${image?.url}`}
                    alt={`${image?.alternativeText}`}
                    className="absolute w-full h-full object-cover p-1 rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* tablet/desktop carousel */}
      <div className=" w-full relative h-full hidden md:block">
        <div className="w-32 h-12 mx-auto">
          {product?.brand?.image?.url && (
            <Image
              width={128}
              height={48}
              loading="lazy"
              src={`${product?.brand?.image?.url}`}
              className="object-contain object-center w-full h-full"
              alt={`${product?.brand?.image?.alternativeText}`}
            />
          )}
        </div>

        <div className="mt-3">
          <div className="h-72 relative">
            <Image
              priority
              fill
              src={`${selectedImage?.url}`}
              alt={`${selectedImage?.alternativeText}`}
              className="object-contain object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>

          <div className="relative mt-4 pr-4">
            <Carousel>
              <CarouselContent>
                {product?.images?.map?.((image, i) => (
                  <CarouselItem
                    key={image?.documentId}
                    onClick={() => setSelectedImage(image)}
                    className={cn('md:basis-1/3 lg:basis-auto')}
                  >
                    <div
                      className={cn(
                        `relative w-[80px] h-[90px] ${selectedImage?.documentId === image?.documentId && 'border border-black rounded-sm'}`,
                        `overflow-hidden cursor-pointer`
                      )}
                    >
                      <Image
                        fill
                        loading="lazy"
                        src={`${image?.url}`}
                        alt={`${image?.alternativeText}`}
                        className="absolute w-full h-full object-cover p-1 rounded-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            {/* <Carousel
              arrows={false}
              keyBoardControl={true}
              responsive={responsive}
              className="overflow-hidden"
              renderButtonGroupOutside={true}
              customButtonGroup={<RightButton />}
            >
              {product?.images?.map?.((image, i) => (
                <div
                  key={i}
                  className={`relative h-20 mr-2  rounded-xl ${selectedImage === i && 'border border-black'} cursor-pointer`}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image
                    fill
                    loading="lazy"
                    src={`${image?.url}`}
                    alt={`${image?.alternativeText}`}
                    className="object-contain p-1 rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </Carousel> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
