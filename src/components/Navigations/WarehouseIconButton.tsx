'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Warehouse } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';

const WarehouseIconButton = () => {
  const warehouseLocation = useSelector(
    (state: RootState) => state.cart.warehouseLocation
  );

  return (
    <Link
      href="/warehouse"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <Warehouse className="h-5 w-5" />
      {warehouseLocation ? (
        <p className="text-sm font-normal">{warehouseLocation.address.city}</p>
      ) : (
        <p className="text-sm font-normal">Warehouse</p>
      )}
    </Link>
  );
};

export default WarehouseIconButton;
