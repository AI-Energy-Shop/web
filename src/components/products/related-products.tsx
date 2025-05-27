import React from 'react';
import Carousel from '../carousels/Home/ImageCarousel';
import { GetStoreProductQuery } from '@/lib/gql/graphql';

interface RelatedProductsProps {
  data?: GetStoreProductQuery['getStoreProduct'];
}

const RelatedProducts = ({ data }: RelatedProductsProps) => {
  const relatedProduct = data?.collections.find(
    (_, index) => index === 0
  )?.title;

  return (
    <section className="bg-yellow-light-yellow pt-6 pb-12 ">
      <div>
        <h1 className="text-xl font-bold ae-mobile-container ae-non-mobile-container mx-auto md:px-12 mb-4">
          Related Products
        </h1>
        <div className="ae-non-mobile-container md:px-12">
          {/* <Carousel.ProductRecoCarousel relatedProductType={relatedProduct} /> */}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
