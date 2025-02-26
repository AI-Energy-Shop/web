'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Filters from './filter/Filters';
import DropdownOptions from './options/DropdownOptions';
import ProductPagination from './ProductPagination';
import { Product } from '@/lib/types';
import { useSearchParams, useRouter } from 'next/navigation';


interface Filter {
  id: string;
  key: string;
  value: string[];
}

interface ProductListProps {
  data: Product[];
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [warehouse, setWarehouse] = useState('SYD');
  const [currentFilter, setCurrentFilter] = useState<Filter[]>([]);
  const [filterCopy, setFilterCopy] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{key: string, value: string}[]>([]);

  const currentProducts = data
    ?.filter((product) => {
      if (selectedFilters.length === 0) {
        return true; // Return all products if no filters are selected
      }
      return product.specification.some((spec) => selectedFilters.some((f) => f.value === spec.value));
    })
    .slice();

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters((prevFilters: {key: string, value: string}[]) => {
      if (prevFilters.some((f) => f.value === value)) {
        const newFilter = prevFilters.filter((f) => f.value !== value);
        if (newFilter.length === 0) {
          setCurrentFilter(filterCopy);
        }
        return newFilter;
      }
      return [...prevFilters, {key, value}];
    });


    // const filteredProducts = currentProducts?.filter((product) => {
    //   return product.specification.some((spec) => spec.value.includes(filter));
    // });

    // const combinedSpecifications =
    //   filteredProducts?.flatMap((product) => product.specification) || [];

    // const groupedSpecifications = combinedSpecifications.reduce(
    //   (acc: any, spec: any) => {
    //     if (!acc[spec.key]) {
    //       acc[spec.key] = {
    //         id: spec.id,
    //         key: spec.key,
    //         value: [],
    //       };
    //     }
    //     if (!acc[spec.key].value.includes(spec.value)) {
    //       acc[spec.key].value.push(spec.value);
    //     }
    //     return acc;
    //   },
    //   {}
    // );

    // // Convert the grouped specifications object back to an array
    // const uniqueSpecifications = Object.values(
    //   groupedSpecifications
    // ) as Filter[];

    // setCurrentFilter((prev) => {
    //   return [...uniqueSpecifications];
    // });
  };

  const handleSortChange = (sort: string) => {
    console.log(sort);
  };

  const handleWarehouseChange = (warehouse: string) => {
    setWarehouse(warehouse);
  };

  const renderProductCard = (product: Product) => {
    const inventory = product.inventory.find((inv) =>
      inv.location.includes(warehouse)
    );
    const price = product.price_list.find(
      (price) => price.user_level === 'SMALL'
    );

    return (
      <ProductCard
        key={product.documentId}
        id={product.documentId}
        image={product.images[0]?.url || ''}
        category={product.category}
        imageAlt={product.images[0]?.name || ''}
        name={`${product.name.slice(0, 45)}`}
        model={product.model}
        price={price}
        inventory={inventory}
        odoo_product_id={product.model}
      />
    );
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const solarPanelFilterList = ['Brand', 'Wattage', 'Colour', 'Key Features', 'Product Warranty']
      const filterOptions = [
        'Product Type',
        'Product Subtype',
        'Brand',
        'Wattage',
        'Power Rating (kW)',
        'Capacity (kWh)',
        'Water Capacity',
        'Inverter Type',
        'Phase Support',
        'Grid Support',
        'No. of MPPTs',
        'Colour',
        'Key Features',
        'Product Warranty'
      ];

      const test = data.flatMap((product) => 
        product.specification.filter((spec) => 
          filterOptions.includes(spec.key)
        )
      );

      const combinedSpecifications = test.reduce((acc: any, spec: any) => {
        if (!acc[spec.key]) {
          acc[spec.key] = {
            id: spec.id,
            key: spec.key,
            value: [],  
            __typename: spec.__typename
          };
        }
        if (!acc[spec.key].value.includes(spec.value)) {
          acc[spec.key].value.push(spec.value);
        }
        return acc;
      }, {});

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
        <DropdownOptions
          onWarehouseChange={handleWarehouseChange}
          onSortChange={handleSortChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentProducts?.map(renderProductCard)}
        </div>
        {/* <ProductPagination
          currentPage={currentPage}
          pageSize={pageSize}
          category={category}
        /> */}
      </div>
    </div>
  );
};

export default Products;
