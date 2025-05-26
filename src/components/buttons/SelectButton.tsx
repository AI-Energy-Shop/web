import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select';
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectButtonProps {
  options: string[];
  onChange: (value: string) => void;
}

const SelectButton = ({ options, onChange }: SelectButtonProps) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[100px] border text-xs p-2 rounded-sm flex items-center justify-between gap-2">
          <SelectValue placeholder="Actions"></SelectValue>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </SelectTrigger>
        <SelectContent className="w-[100px] z-50 bg-white dark:bg-gray-800 shadow-md select-none">
          <SelectGroup className="text-xs">
            {options.map((option) => (
              <SelectItem className="p-1" value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectButton;
