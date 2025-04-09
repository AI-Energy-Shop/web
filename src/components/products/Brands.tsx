'use client';

import React from 'react';
import BrandItem from './BrandItem';
import { useQuery } from '@apollo/client';
import { BrandsQuery } from '@/lib/gql/graphql';
import PRODUCT_OPERATION from '@/graphql/products';
import { Skeleton } from '../ui/skeleton';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface BrandsProps {
  selectedBrands?: string[];
}

const Brands: React.FC<BrandsProps> = ({ selectedBrands }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { category } = useParams();
  const { data, loading } = useQuery<BrandsQuery>(
    PRODUCT_OPERATION.Query.brands
  );

  const onClick = (slug: string) => {
    if (!slug) return;
    if (category) {
      router.replace(`/products/${category}/${slug}`);
    } else {
      router.replace(`${pathname}/all/${slug}`);
    }
  };

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
      <h1 className="text-2xl font-bold text-center mb-4">
        {selectedBrands && selectedBrands.length > 1 ? 'Brands' : 'Brand'}
      </h1>
      <div
        className={cn(
          `grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8`,
          selectedBrands &&
            selectedBrands.length < 5 &&
            'flex flex-wrap justify-center'
        )}
      >
        {selectedBrands && selectedBrands.length > 0
          ? data?.brands?.map?.((brand) => {
              if (selectedBrands?.includes(brand?.url || '')) {
                return (
                  <BrandItem
                    key={brand?.documentId}
                    id={brand?.documentId}
                    name={`${brand?.name}`}
                    logo={`${brand?.image?.url}`}
                    alt={`${brand?.name}`}
                    onClick={() => onClick(brand?.url || '')}
                  />
                );
              }
              return null;
            })
          : data?.brands?.map?.((brand) => (
              <BrandItem
                key={brand?.documentId}
                id={brand?.documentId}
                name={`${brand?.name}`}
                logo={`${brand?.image?.url}`}
                alt={`${brand?.name}`}
                onClick={() => onClick(brand?.url || '')}
              />
            ))}
      </div>
    </div>
  );
};

export default Brands;
