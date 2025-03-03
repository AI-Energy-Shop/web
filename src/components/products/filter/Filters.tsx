import React from 'react';
import FilterItem from './FilterItem';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
interface FiltersProps {
  selectedFilters: { key: string; value: string }[];
  filters: {
    id: string;
    key: string;
    value: string[];
  }[];
  onFilterChange: (key: string, value: string) => void;
}

const FilterSidebar: React.FC<FiltersProps> = (props) => {
  const { filters, selectedFilters, onFilterChange } = props;

  return (
    <>
      <div className="w-64 flex-shrink-0 hidden lg:block">
        <div className="text-sm font-medium mb-4">Filter:</div>
        {filters.map?.((filter, index) => (
          <FilterItem
            index={index}
            key={filter.id}
            name={filter.key}
            value={filter.value}
            onFilterChange={onFilterChange}
            selectedFilters={selectedFilters}
          />
        ))}
      </div>

      <aside className="lg:hidden relative">
        <Button variant="outline" className="w-full bg-transparent">
          <SlidersHorizontal className="w-5 h-5 mr-2 " />
          Filter
        </Button>

        <div className="bg-white p-5 border w-full absolute z-10 top-10 left-0 right-0 rounded-md">
          <Button variant="ghost" size="icon">
            <X className="w-4 h-4" />
          </Button>

          <div className="">
            {filters.map?.((filter, index) => (
              <FilterItem
                index={index}
                key={filter.id}
                name={filter.key}
                value={filter.value}
                onFilterChange={onFilterChange}
                selectedFilters={selectedFilters}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
