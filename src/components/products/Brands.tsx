import React from 'react';
import BrandItem from './BrandItem';

interface BrandsProps {
  brands: { name: string; logo: string }[];
}

const Brands: React.FC<BrandsProps> = ({ brands }) => {
  return (
    <div className="my-8">
      <h1 className="text-2xl font-bold text-center mb-4">Brands:</h1>
      <div className="flex h-auto gap-8 items-center">
        {brands.map((brand, index) => (
          <BrandItem key={index} name={brand.name} logo={brand.logo} />
        ))}
      </div>
    </div>
  );
};

export default Brands;
