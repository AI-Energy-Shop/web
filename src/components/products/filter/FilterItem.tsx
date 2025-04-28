'use client';
import { SelectedFilter } from '@/hooks/useProductFilter';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterItemProps {
  id: string;
  name: string;
  options: Array<{ value: string; count: number }>;
  isOpen: boolean;
  selectedFilters: SelectedFilter[];
  onFilterClick: (selectedFilterOption: SelectedFilter) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  id,
  name,
  options,
  isOpen,
  selectedFilters,
  onFilterClick,
}) => {
  const [open, setOpen] = useState(isOpen);

  const renderFilterItem = (
    option: { value: string; count: number },
    index: number
  ) => {
    return (
      <div
        key={index}
        onClick={() => onFilterClick({ id, key: name, value: option.value })}
        className="flex items-center gap-1 p-2 cursor-pointer transition-all duration-300 hover:bg-gray-100"
      >
        <input
          type="checkbox"
          name={option.value}
          checked={selectedFilters.some(
            (filter) => filter.value === option.value
          )}
        />
        <Label className="text-sm font-normal">{option.value}</Label>
        <span className="text-xs text-gray-500">({option.count})</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col cursor-pointer">
      <div className="flex items-center justify-between p-1">
        <Label>{name.replaceAll('_', ' ')}</Label>
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div
        className={cn(
          `w-full border-b border-gray-200 flex flex-col gap-1 overflow-hidden ease-in-out duration-500 ${open ? 'h-auto py-2 overflow-y-auto' : 'h-0 overflow-hidden'}`
        )}
      >
        {options.map(renderFilterItem)}
      </div>
    </div>
  );
};

export default FilterItem;
