'use client';
import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { useQuery } from '@apollo/client';
import COLLECTIONS_OPERATIONS from '@/graphql/collections';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface CategoriesProps {
  acceptedCollections: string[];
  excludedCollections?: string[];
}
const Categories: React.FC<CategoriesProps> = ({ acceptedCollections, excludedCollections = ['all'] }) => {
  const pathname = usePathname();
  const { data, loading } = useQuery(COLLECTIONS_OPERATIONS.Query.collections, {
    variables: {
      filters: {
        and: [
          {
            handle: {
              in: acceptedCollections,
            },
          },
          {
            handle: {
              notIn: excludedCollections,
            },
          },
        ],
      },
    },
  });

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
          {data?.collections?.map?.((collection) => (
            <Link
              key={`${collection?.documentId}`}
              className="w-full h-full"
              title={`${collection?.title}`}
              href={`/collections/${collection?.handle}`}
            >
              <div className="w-full h-full flex flex-col items-center gap-1">
                <div className="w-full h-full relative">
                  <Image
                    fill
                    loading="lazy"
                    src={`${collection?.image?.url}`}
                    alt={`${collection?.image?.alternativeText}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="opacity-6 absolute top-0 left-0 w-full h-full object-fit"
                  />
                </div>
                <span className={`text-xs ${pathname === collection?.handle && 'border-b-2 border-black'}`}>
                  {collection?.title}
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
