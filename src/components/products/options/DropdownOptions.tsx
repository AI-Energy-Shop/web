import React from 'react';
import WarehouseOptions from './WarehouseOptions';
import SortOption from './SortOption';

interface DropdownOptionsProps {
  onWarehouseChange: (warehouse: string) => void;
  onSortChange: (sort: string) => void;
}

const DropdownOptions = ({
  onWarehouseChange,
  onSortChange,
}: DropdownOptionsProps) => {
  return (
    <div className="flex justify-end gap-2 m-2">
      <WarehouseOptions onWarehouseChange={onWarehouseChange} />
      <SortOption onSortChange={onSortChange} />
    </div>
  );
};

export default DropdownOptions;
