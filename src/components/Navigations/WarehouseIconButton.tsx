'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Warehouse } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const WarehouseIconButton = () => {
  const me = useSelector((state: RootState) => state.me);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <Warehouse className="h-5 w-5" />
      <p className="text-sm font-normal">Warehouse</p>
    </Button>
  );
};

export default WarehouseIconButton;
