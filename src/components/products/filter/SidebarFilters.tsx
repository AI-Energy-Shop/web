'use client';

import React from 'react';
import { X } from 'lucide-react';
import FilterItem from './FilterItem';
import { Button } from '@/components/ui/button';
import * as SelectUI from '@/components/ui/select';
import { Filter, SelectedFilter } from '@/hooks/useProductFilter';
import { capitalizeAllFirstChar } from '@/utils/string';

interface FiltersProps {
  filterOptions: Filter[];
  selectedFilters: SelectedFilter[];
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  handleRemoveFilter: (filter: SelectedFilter) => void;
  handleFilterClick: (filter: SelectedFilter) => void;
  removeAllFilters: () => void;
}

const SidebarFilters: React.FC<FiltersProps> = ({
  filterOptions,
  selectedFilters,
  showMobileFilters,
  setShowMobileFilters,
  handleRemoveFilter,
  handleFilterClick,
  removeAllFilters,
}) => {
  return (
    <>
      {/* DESKTOP FILTERS */}
      <div className="desktop w-64 flex-shrink-0 hidden md:block">
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
          {selectedFilters.map((filter) => {
            return (
              <div
                key={filter.id}
                className="inline-flex items-center border pl-2 pr-1 py-1 rounded-2xl w-fit shrink-0 gap-1 group"
              >
                <span className="text-xs truncate max-w-[150px]">
                  {capitalizeAllFirstChar(filter.key)}: {filter.value.split('+').join(' ')}
                </span>
                <Button
                  className="p-0 w-6 h-6 rounded-full flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFilter(filter)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* ONLY RETURN A OPTIONS OF VALUES ARE GREATER THAN 1 */}
        {filterOptions.map?.((filter, index) => {
          return (
            <FilterItem
              key={filter.id}
              id={filter.id}
              name={filter.key}
              value={filter.value as string[]}
              isOpen={index === 0 || selectedFilters.some((f) => f.key === filter.key)}
              // isOpen={selectedFilters.some((f) => f.key === filter.key)}
              selectedFilters={selectedFilters}
              onFilterClick={handleFilterClick}
            />
          );
        })}
      </div>

      {/* MOBILE FILTERS */}
      <div
        className={`mobile w-[90%] h-full block md:hidden border fixed top-0 right-0 bg-white z-50 ${
          showMobileFilters ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-full h-full p-5">
          <div className="flex items-center justify-between gap-5">
            <SelectUI.Select>
              <SelectUI.SelectTrigger>
                <SelectUI.SelectValue placeholder="Sort By" />
              </SelectUI.SelectTrigger>
              <SelectUI.SelectContent defaultValue="fetured">
                <SelectUI.SelectItem value="featured">Featured</SelectUI.SelectItem>
                <SelectUI.SelectItem value="newest">Newest</SelectUI.SelectItem>
                <SelectUI.SelectItem value="oldest">Oldest</SelectUI.SelectItem>
                <SelectUI.SelectItem value="price-asc">Price: Low to High</SelectUI.SelectItem>
                <SelectUI.SelectItem value="price-desc">Price: High to Low</SelectUI.SelectItem>
              </SelectUI.SelectContent>
            </SelectUI.Select>
            <Button size="icon" variant="ghost" className="p-2" onClick={() => setShowMobileFilters(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="pt-5">
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
              {selectedFilters.map((filter) => {
                return (
                  <div
                    key={filter.id}
                    className="inline-flex items-center border pl-2 pr-1 py-1 rounded-2xl w-fit shrink-0 gap-1 group"
                  >
                    <span className="text-xs truncate max-w-[150px]">
                      {capitalizeAllFirstChar(filter.key)}: {filter.value.split('+').join(' ')}
                    </span>
                    <Button
                      className="p-0 w-6 h-6 rounded-full flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFilter(filter)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* ONLY RETURN A OPTIONS OF VALUES ARE GREATER THAN 1 */}
            {filterOptions.map?.((filter, index) => {
              return (
                <FilterItem
                  key={filter.id}
                  id={filter.id}
                  name={filter.key}
                  value={filter.value as string[]}
                  isOpen={index === 0 || selectedFilters.some((f) => f.key === filter.key)}
                  // isOpen={selectedFilters.some((f) => f.key === filter.key)}
                  selectedFilters={selectedFilters}
                  onFilterClick={handleFilterClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarFilters;
