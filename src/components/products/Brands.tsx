import React from 'react';
import BrandItem from './BrandItem';
import { ProductsQuery } from '@/lib/gql/graphql';
type Brand = {
  id: string;
  name: string;
  logo: string;
};
interface BrandsProps {
  products?: ProductsQuery['products'];
}

const Brands: React.FC<BrandsProps> = ({ products }) => {
  const brandImages = products?.map((product) => product?.product_brand_image);

  // remove duplicate images
  const uniqueBrandImages = brandImages?.filter(
    (image, index, self) => self.indexOf(image) === index
  );

  return (
    <div className="my-8">
      <h1 className="text-2xl font-bold text-center mb-4">Brands:</h1>
      <div className="flex h-auto gap-8 items-center">
        {/* {brands?.map?.((brand, index) => (
          <BrandItem key={index} name={brand.name} logo={brand.logo} />
        ))} */}
      </div>
    </div>
  );
};

export default Brands;
