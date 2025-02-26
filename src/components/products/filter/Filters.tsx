import React from 'react';
import FilterItem from './FilterItem';

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
    <div className="w-64 flex-shrink-0">
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
  );
};

export default FilterSidebar;
