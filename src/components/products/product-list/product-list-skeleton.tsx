import React from 'react';

interface ProductListSkeletonProps {
  entryCount: number;
}
const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({
  entryCount,
}) => {
  return (
    <div className="products flex gap-8">
      <div className="flex-1">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(entryCount)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
