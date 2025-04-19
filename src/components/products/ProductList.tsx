'use client';
import React from 'react';
import ProductCard from './ProductCard';
import SidebarFilters from './filter/SidebarFilters';
import ProductPagination from './ProductPagination';
import { ProductsQuery } from '@/lib/gql/graphql';
import SortOption from './options/SortOption';
import useProductFilter from '@/hooks/useProductFilter';
import { Button } from '../ui/button';
import { SlidersHorizontal } from 'lucide-react';

interface ProductListProps {
  page?: number;
  pageSize?: number;
  data?: ProductsQuery['products'];
  showFilters?: boolean;
  isLoading?: boolean;
}

const ProductsList: React.FC<ProductListProps> = ({ data, page, pageSize, showFilters, isLoading }) => {
  const {
    filterOptions,
    selectedFilters,
    showMobileFilters,
    setShowMobileFilters,
    handleSortChange,
    handleRemoveFilter,
    handleFilterClick,
    removeAllFilters,
  } = useProductFilter();

  return (
    <div className="products flex gap-8">
      {showFilters && (
        <SidebarFilters
          showMobileFilters={showMobileFilters}
          setShowMobileFilters={setShowMobileFilters}
          filterOptions={filterOptions}
          selectedFilters={selectedFilters}
          handleRemoveFilter={handleRemoveFilter}
          handleFilterClick={handleFilterClick}
          removeAllFilters={removeAllFilters}
        />
      )}
      <div className="flex-1">
        {showFilters && (
          <div className="justify-end gap-2 m-2 hidden md:flex">
            <SortOption onSortChange={handleSortChange} />
          </div>
        )}
        <div className="w-full block md:hidden">
          <Button variant="outline" className="w-full" onClick={() => setShowMobileFilters(true)}>
            <SlidersHorizontal />
            Filter & Sort
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {data?.map((product) => {
            return <ProductCard key={product?.documentId} product={product} />;
          })}
        </div>
        <ProductPagination page={page} pageSize={pageSize} dataCount={data?.length || 0} />
      </div>
    </div>
  );
};

export default ProductsList;
