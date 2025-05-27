'use client';
import { Filter, SelectedFilter } from '@/hooks/useProductFilter';
import { capitalizeAllFirstChar } from '@/utils/string';
import { Button } from '@/components/ui/button';
import FilterItem from './FilterItem';
import React from 'react';
import { X } from 'lucide-react';

interface FilterListProps {
  loading?: boolean;
  filterOptions: Filter[];
  selectedFilters: SelectedFilter[];
  onInputChange: (selectedFilterOption: SelectedFilter) => void;
  onInputClick: (selectedFilterOption: SelectedFilter) => void;
  onRemoveFilter: (filter: SelectedFilter) => void;
  onClearAll: () => void;
}

const FilterList: React.FC<FilterListProps> = ({
  loading,
  filterOptions,
  selectedFilters,
  onInputChange,
  onInputClick,
  onRemoveFilter,
  onClearAll,
}) => {
  return (
    <>
      {/* SELECTED FILTERS */}
      <div className="text-sm font-medium mb-4 flex items-center justify-between">
        <span className="text-gray-500">Filter:</span>
        {selectedFilters.length > 0 && (
          <Button
            variant="ghost"
            className="text-gray-500 underline cursor-pointer p-0 m-0 h-auto hover:bg-transparent"
            onClick={onClearAll}
          >
            Remove All
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-1 h-auto">
        {selectedFilters.map((filter) => (
          <div
            key={filter.id}
            className="inline-flex items-center border pl-2 pr-1 py-1 rounded-2xl w-fit shrink-0 gap-1 group"
          >
            <span className="text-xs truncate max-w-[150px]">
              {capitalizeAllFirstChar(filter.key)}:{' '}
              {filter.value.split('+').join(' ')}
            </span>
            <Button
              className="p-0 w-6 h-6 rounded-full flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
              variant="ghost"
              size="sm"
              onClick={() => onRemoveFilter(filter)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className={`${loading ? 'opacity-50' : 'opacity-100'}`}>
        {filterOptions.map?.((filter, index) => (
          <FilterItem
            key={filter.id}
            id={filter.id}
            name={filter.key}
            options={filter.options}
            isOpen={
              index === 0 || selectedFilters.some((f) => f.key === filter.key)
            }
            loading={loading ?? false}
            selectedFilters={selectedFilters}
            onInputChange={onInputChange}
            onInputClick={onInputClick}
          />
        ))}

        {/* <Accordion type="multiple" className="w-full">
          {filterOptions.map?.((filter, filterIndex) => (
            <AccordionItem key={`${filter.id}`} value={`${filterIndex}`}>
              <AccordionTrigger>
                {filter.key.replaceAll('_', ' ')}
              </AccordionTrigger>
              <AccordionContent>
                {filter.options.map((option, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        onFilterClick({
                          id: filter.id,
                          key: filter.key,
                          value: option.value,
                        })
                      }
                      className="flex items-center gap-1 p-2 cursor-pointer transition-all duration-300 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        name={option.value}
                        checked={selectedFilters.some(
                          (filter) => filter.value === option.value
                        )}
                      />
                      <Label className="text-sm font-normal">
                        {option.value}
                      </Label>
                      <span className="text-xs text-gray-500">
                        ({option.count})
                      </span>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion> */}
      </div>
    </>
  );
};

export default FilterList;
