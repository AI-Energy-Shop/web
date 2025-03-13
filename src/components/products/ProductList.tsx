'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Filters from './filter/Filters';
import ProductPagination from './ProductPagination';
import { ProductsQuery } from '@/lib/gql/graphql';
import SortOption from './options/SortOption';
interface Filter {
  id: string;
  key: string;
  value: string[];
}

interface ProductListProps {
  data?: ProductsQuery['products'];
  start?: number;
  limit?: number;
  currentPage: number;
  pageSize: number;
  category?: string;
}

const Products: React.FC<ProductListProps> = ({
  data,
  currentPage,
  pageSize,
  category,
}) => {
  const [currentFilter, setCurrentFilter] = useState<Filter[]>([]);
  const [filterCopy, setFilterCopy] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    { key: string; value: string }[]
  >([]);

  const currentProducts = data
    ?.filter((product) => {
      if (selectedFilters.length === 0) {
        return true; // Return all products if no filters are selected
      }
      return product?.specification?.some((spec) =>
        selectedFilters.some((f) => f.value === spec?.value)
      );
    })
    .slice();

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prevFilters: { key: string; value: string }[]) => {
      if (prevFilters.some((f) => f.value === value)) {
        const newFilter = prevFilters.filter((f) => f.value !== value);
        if (newFilter.length === 0) {
          setCurrentFilter(filterCopy);
        }
        return newFilter;
      }
      return [...prevFilters, { key, value }];
    });
  };

  const handleSortChange = (sort: string) => {
    console.log(sort);
  };

  const renderProductCard = (product: ProductsQuery['products'][0]) => {
    if (!product) return null;

    return (
      <ProductCard
        key={product.documentId}
        documentId={product.documentId}
        images={product.images}
        name={`${product?.name?.slice(0, 45)}`}
        model={product?.model || ''}
        price_list={product?.price_list}
        inventories={product?.inventories}
        odoo_product_id={product?.model || ''}
        files={product?.files}
        category={product?.category}
      />
    );
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const filterOptions = [
        'Product Type',
        'Product Subtype',
        'Brand',
        'Wattage',
        'Power Rating',
        'Capacity (kWh)',
        'Water Capacity',
        'Inverter Type',
        'Phase Support',
        'Grid Support',
        'No. of MPPTs',
        'Colour',
        'Key Features',
        'Product Warranty',
      ];

      const specifications = data.flatMap((product) =>
        product?.specification?.filter((spec) =>
          filterOptions.includes(spec?.key || '')
        )
      );

      const combinedSpecifications = specifications.reduce(
        (acc: any, spec: any) => {
          if (!acc[spec.key]) {
            acc[spec.key] = {
              id: spec.id,
              key: spec.key,
              value: [],
              __typename: spec.__typename,
            };
          }
          if (!acc[spec.key].value.includes(spec.value)) {
            acc[spec.key].value.push(spec.value);
          }
          return acc;
        },
        {}
      );

      const uniqueSpecifications = Object.values(
        combinedSpecifications
      ) as Filter[];
      setCurrentFilter(uniqueSpecifications);
      setFilterCopy(uniqueSpecifications);
    }
  }, [data]);

  return (
    <div className="products flex gap-8">
      <Filters
        selectedFilters={selectedFilters}
        filters={currentFilter}
        onFilterChange={handleFilterChange}
      />
      <div className="flex-1">
        <div className="flex justify-end gap-2 m-2">
          <SortOption onSortChange={handleSortChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentProducts?.map(renderProductCard)}
        </div>
        <ProductPagination
          currentPage={currentPage}
          pageSize={pageSize}
          category={category}
        />
      </div>
    </div>
  );
};

export default Products;
