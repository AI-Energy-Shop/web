import React from 'react';
import Carousel from '../custom-ui/Carousel';
import { ProductQuery } from '@/lib/gql/graphql';

interface RelatedProductsProps {
  data?: ProductQuery['product'];
}

const RelatedProducts = ({ data }: RelatedProductsProps) => {
  const relatedProductCategory = data?.category?.slug;

  return (
    <section className="bg-yellow-light-yellow pt-6 pb-12 ">
      <div>
        <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container mx-auto md:px-12 mb-4">
          Related Products
        </h1>
        <div className="ae-non-mobile-container md:px-12">
          <Carousel.ProductRecoCarousel
            relatedProductType={relatedProductCategory}
          />
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
