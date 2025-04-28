'use client';
import React from 'react';
import ProductCard from './ProductCard';
import ProductPagination from './ProductPagination';
import { ProductsQuery } from '@/lib/gql/graphql';

interface ProductListProps {
  page?: number;
  pageSize?: number;
  data?: ProductsQuery['products'];
}

const ProductsList: React.FC<ProductListProps> = ({ data, page, pageSize }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.map((product) => {
          return <ProductCard key={product?.documentId} product={product} />;
        })}
      </div>
      <ProductPagination page={page} pageSize={pageSize} />
    </>
  );
};

export default ProductsList;
