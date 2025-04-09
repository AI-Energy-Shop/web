'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SelectedFilter } from '@/hooks/useProductFilter';

interface FilterItemProps {
  name: string;
  value: string[]; //might have similar values
  valueCount: number;
  isOpen: boolean;
  selectedFilters: SelectedFilter[];
  onFilterChange: (key: string, value: string, id: string) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  name,
  value,
  valueCount,
  isOpen,
  selectedFilters,
  onFilterChange,
}) => {
  const path = usePathname();
  const fullPath = useSearchParams();
  const [open, setOpen] = useState(isOpen);

  //get unique values from value array
  const uniqueValues = [...new Set(value)];
  //get the count of the similar values
  const count = value.reduce((acc: any, curr: any) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const renderFilterItem = (item: string, index: number) => {
    const paramName = name.toLowerCase().replaceAll(' ', '-');
    const paramValue = item.toLowerCase().replaceAll(' ', '-');

    // Create URLSearchParams from current search params
    const searchParams = new URLSearchParams(fullPath.toString());

    // Get current values for this filter
    const currentValues = searchParams.getAll(paramName);

    let newSearchParams = new URLSearchParams(searchParams);

    if (currentValues.includes(paramValue)) {
      // Remove the value if it exists
      const filteredValues = currentValues.filter((v) => v !== paramValue);
      newSearchParams.delete(paramName);
      filteredValues.forEach((v) => newSearchParams.append(paramName, v));
    } else {
      // Add the new value
      newSearchParams.append(paramName, paramValue);
    }

    // Build the href
    const href = `${path}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;

    return (
      <Link key={index} href={href} className="flex items-center gap-1">
        <Checkbox
          name={item}
          onCheckedChange={() => onFilterChange(name, item, index.toString())}
          checked={currentValues.includes(paramValue)}
        />
        <Label className="text-sm font-normal">{item}</Label>
        <span className="text-xs text-gray-500">({count[item]})</span>
      </Link>
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
          `w-full border-b border-gray-200 flex flex-col gap-2 overflow-hidden ease-in-out duration-500 ${open ? 'h-auto py-2 overflow-y-auto' : 'h-0 overflow-hidden'}`
        )}
      >
        {uniqueValues.map(renderFilterItem)}
      </div>
    </div>
  );
};

export default FilterItem;
