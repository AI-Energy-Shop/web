import ProductListSkeleton from './ProductListSkeleton';
import ProductPagination from './ProductPagination';
import { ProductsQuery } from '@/lib/gql/graphql';
import { INITIAL_PAGE_SIZE } from '@/constant';
import React, { Suspense } from 'react';
import ProductCard from './product-card';

interface ProductListProps {
  page?: number;
  pageSize?: number;
  data?: ProductsQuery['products'] | null;
}

const ProductsList: React.FC<ProductListProps> = ({ data, page, pageSize }) => {
  return (
    <Suspense fallback={<ProductListSkeleton entryCount={INITIAL_PAGE_SIZE} />}>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {data
          ?.filter((product) => product?.releasedAt)
          .map((product) => {
            return <ProductCard key={product?.documentId} product={product} />;
          })}
      </div>
      <ProductPagination page={page} pageSize={pageSize} />
    </Suspense>
  );
};

export default ProductsList;
