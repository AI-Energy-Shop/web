'use client';

import React from 'react';
import FilterItem from './FilterItem';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useProductFilter from '@/hooks/useProductFilter';
import { capitalizeAllFirstChar } from '@/utils/string';

interface FiltersProps {}

const SidebarFilters: React.FC<FiltersProps> = (props) => {
  const {
    filterOptions,
    selectedFilters,
    handleRemoveFilter,
    handleFilterChange,
    removeAllFilters,
  } = useProductFilter();

  const formatFilterValue = (value: string) => {
    return value.split('-').map(capitalizeAllFirstChar).join(' ');
  };

  return (
    <div className="w-64 flex-shrink-0 hidden md:block">
      <div className="text-sm font-medium mb-4 flex items-center justify-between">
        <span className="text-gray-500">Filter:</span>
        <Button
          variant="ghost"
          className="text-gray-500 underline cursor-pointer p-0 m-0 h-auto hover:bg-transparent"
          onClick={removeAllFilters}
        >
          Remove All
        </Button>
      </div>

      <div className="flex flex-wrap gap-1 h-auto">
        {selectedFilters.map((filter, index) => (
          <div
            key={index}
            className="inline-flex items-center border px-2 py-1 rounded-2xl w-fit shrink-0"
          >
            <span className="text-xs truncate max-w-[150px]">
              {capitalizeAllFirstChar(filter.key)}:{' '}
              {filter.value.map((value) => formatFilterValue(value)).join(', ')}
            </span>
            <Button
              className="p-0 w-6 h-6 rounded-full flex-shrink-0"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveFilter(filter)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* ONLY RETURN A OPTIONS OF VALUES ARE GREATER THAN 1 */}
      {filterOptions.map?.((filter, index) => {
        return (
          <FilterItem
            key={filter.id}
            name={filter.key}
            value={filter.value}
            valueCount={filter.valueCount}
            isOpen={index === 0}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        );
      })}
    </div>
  );
};

export default SidebarFilters;
