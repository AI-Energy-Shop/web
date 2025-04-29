'use client';
import { Filter, SelectedFilter } from '@/hooks/useProductFilter';
import { Button } from '@/components/ui/button';
import FilterItem from './FilterItem';
import { X } from 'lucide-react';

interface SidebarFilterProps {
  filters: Filter[];
  selectedFilters: SelectedFilter[];
  onFilterClick: (selectedFilterOption: SelectedFilter) => void;
  onClearFilters: () => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ filters, selectedFilters, onFilterClick, onClearFilters }) => {
  return (
    <div className="flex flex-col gap-4">
      {selectedFilters.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {selectedFilters.length} filter
            {selectedFilters.length > 1 ? 's' : ''} applied
          </span>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {filters.map((filter) => (
          <FilterItem
            key={filter.id}
            id={filter.id}
            name={filter.key}
            options={filter.options}
            isOpen={true}
            selectedFilters={selectedFilters}
            onFilterClick={onFilterClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarFilter;
