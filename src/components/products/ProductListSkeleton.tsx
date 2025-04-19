import { INITIAL_PAGE_SIZE } from '@/constant';
import React from 'react';

interface ProductListSkeletonProps {
  showFilters?: boolean;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({ showFilters }) => {
  return (
    <div className="products flex gap-8">
      {showFilters && (
        <div className="w-64 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(INITIAL_PAGE_SIZE)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1">
        {showFilters && (
          <div className="flex justify-end gap-2 m-2">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(INITIAL_PAGE_SIZE)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
