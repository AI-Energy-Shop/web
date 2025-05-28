import React from 'react';
import {
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '../../ui/select';

interface WarehouseOptionsProps {
  onWarehouseChange: (warehouse: string) => void;
}

const WarehouseOptions = ({ onWarehouseChange }: WarehouseOptionsProps) => {
  return (
    <Select defaultValue="SYD" onValueChange={onWarehouseChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Warehouse" />
      </SelectTrigger>
      <SelectContent position="popper" className="user-select-none">
        <SelectItem value="SYD">SYD</SelectItem>
        <SelectItem value="MEL">MEL</SelectItem>
        <SelectItem value="BNE">BNE</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default WarehouseOptions;
