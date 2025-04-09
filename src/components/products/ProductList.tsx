'use client';
import React from 'react';
import ProductCard from './ProductCard';
import SidebarFilters from './filter/SidebarFilters';
import ProductPagination from './ProductPagination';
import { ProductsQuery } from '@/lib/gql/graphql';
import SortOption from './options/SortOption';

interface ProductListProps {
  data?: ProductsQuery['products'];
  category?: string;
}

const Products: React.FC<ProductListProps> = ({ data, category }) => {
  return (
    <div className="products flex gap-8">
      <SidebarFilters />
      <div className="flex-1">
        <div className="flex justify-end gap-2 m-2">
          <SortOption onSortChange={() => {}} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {data?.map((product) => {
            return <ProductCard key={product?.documentId} product={product} />;
          })}
        </div>
        <ProductPagination category={category} />
      </div>
    </div>
  );
};

export default Products;
