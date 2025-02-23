'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FilterItemProps {
  name: string;
  value: string[];
  selectedFilters: string[];
  onFilterChange: (filter: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  name,
  value,
  selectedFilters,
  onFilterChange,
}) => {
  const renderFilterItem = (item: string, index: number) => {
    return (
      <div key={index} className="flex items-center gap-2">
        <Checkbox
          name={item}
          onCheckedChange={() => onFilterChange(item)}
          checked={selectedFilters.includes(item)}
        />
        <Label className="text-sm font-normal">{item}</Label>
      </div>
    );
  };
  const [isOpen, setIsOpen] = useState(
    value.some((item) => selectedFilters.includes(item))
  );
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Label>{name}</Label>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="w-full border-b border-gray-200 py-1 flex flex-col gap-2 overflow-hidden">
        {isOpen && value.map(renderFilterItem)}
      </div>
    </div>
  );
};

export default FilterItem;
