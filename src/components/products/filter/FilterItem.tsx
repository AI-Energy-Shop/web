'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterItemProps {
  index: number;
  name: string;
  value: string[];
  selectedFilters: { key: string; value: string }[];
  onFilterChange: (key: string, value: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  index,
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
          onCheckedChange={() => onFilterChange(name, item)}
          checked={selectedFilters.some((f) => f.value === item)}
        />
        <Label className="text-sm font-normal">{item}</Label>
      </div>
    );
  };

  const [isOpen, setIsOpen] = useState(
    index === 0
      ? true
      : value.some((item) => selectedFilters.some((f) => f.value === item))
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

      <div
        className={cn(
          `w-full border-b border-gray-200 flex flex-col gap-2 overflow-hidden ease-in-out duration-500 ${isOpen ? 'min-h-[100px] py-1 overflow-y-auto' : 'h-0 overflow-hidden'}`
        )}
      >
        {value.map(renderFilterItem)}
      </div>
    </div>
  );
};

export default FilterItem;
