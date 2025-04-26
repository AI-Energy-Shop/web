import React from 'react';
import WarehouseOptions from './WarehouseOptions';
import SortOption from './SortOption';

interface DropdownOptionsProps {
  onWarehouseChange: (warehouse: string) => void;
}

const DropdownOptions = ({ onWarehouseChange }: DropdownOptionsProps) => {
  return (
    <div className="flex justify-end gap-2 m-2">
      <WarehouseOptions onWarehouseChange={onWarehouseChange} />
      <SortOption />
    </div>
  );
};

export default DropdownOptions;
