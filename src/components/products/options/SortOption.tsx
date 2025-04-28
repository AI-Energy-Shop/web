'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
import { SORT_OPTIONS } from '@/constant/product';
import useProductFilter from '@/hooks/useProductFilter';
interface SortOptionProps {}

const SortOption: React.FC<SortOptionProps> = () => {
  const { handleSortChange } = useProductFilter();

  return (
    <Select
      defaultValue={SORT_OPTIONS[0].value}
      onValueChange={handleSortChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent position="popper" className="user-select-none">
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortOption;
