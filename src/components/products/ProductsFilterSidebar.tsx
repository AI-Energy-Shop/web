import React from 'react';
import ProductFilterItem from './ProductFilterItem';

interface ProductsFilterSidebarProps {
  filters: { name: string }[];
}

const ProductsFilterSidebar: React.FC<ProductsFilterSidebarProps> = ({
  filters,
}) => {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="text-sm font-medium mb-4">Filter:</div>
      {filters.map((filter, index) => (
        <ProductFilterItem key={index} name={filter.name} />
      ))}
    </div>
  );
};

export default ProductsFilterSidebar;
