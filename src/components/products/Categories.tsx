'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@apollo/client';
import PRODUCTS_OPERATIONS from '@/graphql/products';
import { CategoriesQuery } from '@/lib/gql/graphql';
import { Skeleton } from '../ui/skeleton';
interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  const pathname = usePathname();

  const { data, loading } = useQuery<CategoriesQuery>(
    PRODUCTS_OPERATIONS.Query.categories
  );

  if (loading) {
    // SKELETONG LOADING
    return (
      <div className="w-full bg-[#f5efe6] p-5">
        <div className="w-full lg:max-w-[1200px] mx-auto grid grid-cols-7 gap-5">
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
    <div className="w-full bg-[#f5efe6] p-5">
      <div className="w-full lg:max-w-[1200px] mx-auto">
        <div className="w-full h-[100px] flex items-center justify-between gap-10 lg:gap-0 overflow-x-auto">
          {data?.categories?.map?.((category) => (
            <Link
              className="w-full h-full"
              title={`${category?.title}`}
              key={`${category?.documentId}`}
              href={`/products/${category?.slug}`}
            >
              <div className="w-full h-full flex flex-col items-center gap-1">
                <div className="w-full h-full relative">
                  <Image
                    fill
                    loading="lazy"
                    src={`${category?.image?.url}`}
                    alt={`${category?.image?.alternativeText}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="opacity-6 absolute top-0 left-0 w-full h-full object-fit"
                  />
                </div>
                <span
                  className={`text-xs ${pathname === category?.slug && 'border-b-2 border-black'}`}
                >
                  {category?.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
