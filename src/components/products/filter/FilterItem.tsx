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
  value: string[]; //might have similar values
  isOpen: boolean;
  selectedFilters: SelectedFilter[];
  onFilterClick: (selectedFilterOption: SelectedFilter) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  id,
  name,
  value,
  isOpen,
  selectedFilters,
  onFilterClick,
}) => {
  const [open, setOpen] = useState(isOpen);

  //get unique values from value array
  const uniqueValues = [...new Set(value)];
  //get the count of the similar values
  const count = value.reduce((acc: any, curr: any) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const renderFilterItem = (item: string, index: number) => {
    return (
      <div
        key={index}
        onClick={() => onFilterClick({ id, key: name, value: item })}
        className="flex items-center gap-1 p-2 cursor-pointer transition-all duration-300 hover:bg-gray-100"
      >
        <input
          type="checkbox"
          name={item}
          checked={selectedFilters.some((filter) => filter.value === item)}
        />
        <Label className="text-sm font-normal">{item}</Label>
        <span className="text-xs text-gray-500">({count[item]})</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-1">
        <Label>{name}</Label>
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
        {uniqueValues.map(renderFilterItem)}
      </div>
    </div>
  );
};

export default FilterItem;
