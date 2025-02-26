import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface SortOptionProps {
  onSortChange: (sort: string) => void;
}

const SortOption = ({ onSortChange }: SortOptionProps) => {
  return (
    <Select defaultValue="featured" onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent position="popper" className="user-select-none">
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-low">Price, low to high</SelectItem>
        <SelectItem value="price-high">Price, high to low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortOption;
