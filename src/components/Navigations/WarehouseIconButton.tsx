'use client';

import React from 'react';
import { Warehouse } from 'lucide-react';
import { RootState, useAppSelector } from '@/store/store';
import Link from 'next/link';

const WarehouseIconButton = () => {
  const warehouseLocation = useAppSelector(
    (state: RootState) => state.checkout.warehouseLocation
  );
  // If no user data, show login link instead
  if (warehouseLocation) {
    return (
      <div className="flex flex-col items-center m-0 w-auto h-auto px-1">
        <Warehouse className="h-5 w-5" />
        <span className="text-sm font-normal">{`${warehouseLocation.name}`}</span>
      </div>
    );
  }
  return (
    <Link
      href="/auth/login"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <Warehouse className="h-5 w-5" />
      <span className="text-sm font-normal">Warehouse</span>
    </Link>
  );
};

export default WarehouseIconButton;
