'use client';

import React from 'react';
import BrandItem from './BrandItem';
import { useQuery } from '@apollo/client';
import { BrandsQuery } from '@/lib/gql/graphql';
import PRODUCT_OPERATION from '@/graphql/products';
import { Skeleton } from '../ui/skeleton';

const Brands = () => {
  const { data, loading } = useQuery<BrandsQuery>(
    PRODUCT_OPERATION.Query.brands
  );

  if (loading) {
    return (
      <div className="my-8">
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
    <div className="my-8">
      <h1 className="text-2xl font-bold text-center mb-4">Brands</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {data?.brands?.map?.((brand) => (
          <BrandItem
            key={brand?.documentId}
            name={`${brand?.name}`}
            logo={`${brand?.image?.url}`}
            alt={`${brand?.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
