'use client';

import * as SelectUI from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import React, { Suspense } from 'react';
import { X } from 'lucide-react';
import useProductFilter from '@/hooks/useProductFilter';
import FilterList from './FilterList';

interface SidebarFiltersProps {}

const SidebarFilters: React.FC<SidebarFiltersProps> = () => {
  const {
    loading,
    filterOptions,
    selectedFilters,
    showMobileFilters,
    removeAllFilters,
    handleRemoveFilter,
    handleFilterClick,
    setShowMobileFilters,
  } = useProductFilter();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* DESKTOP FILTERS */}
        <div className="desktop w-64 flex-shrink-0">
          <FilterList
            loading={loading}
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            onInputChange={handleFilterClick}
            onInputClick={handleFilterClick}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={removeAllFilters}
          />
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
                  <SelectUI.SelectItem value="featured">
                    Featured
                  </SelectUI.SelectItem>
                  <SelectUI.SelectItem value="newest">
                    Newest
                  </SelectUI.SelectItem>
                  <SelectUI.SelectItem value="oldest">
                    Oldest
                  </SelectUI.SelectItem>
                  <SelectUI.SelectItem value="price-asc">
                    Price: Low to High
                  </SelectUI.SelectItem>
                  <SelectUI.SelectItem value="price-desc">
                    Price: High to Low
                  </SelectUI.SelectItem>
                </SelectUI.SelectContent>
              </SelectUI.Select>
              <Button
                size="icon"
                variant="ghost"
                className="p-2"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="pt-5">
              <FilterList
                loading={loading}
                filterOptions={filterOptions}
                selectedFilters={selectedFilters}
                onInputChange={handleFilterClick}
                onInputClick={handleFilterClick}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={removeAllFilters}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default SidebarFilters;
