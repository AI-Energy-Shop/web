'use client';

import React from 'react';
import { Warehouse } from 'lucide-react';
import { RootState, useAppSelector } from '@/store/store';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const WarehouseIconButton = () => {
  const cart = useAppSelector((state: RootState) => state.cart);

  // If no user data, show login link instead
  if (!cart.warehouseLocation) {
    return (
      <Link href="/auth/login" className="flex flex-col items-center m-0 w-auto h-auto px-1">
        <Warehouse className="h-5 w-5" />
        <span className="text-sm font-normal">Warehouse</span>
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center m-0 w-auto h-auto px-1">
      <Warehouse className="h-5 w-5" />
      <span className="text-sm font-normal">{`${cart?.warehouseLocation?.address?.city}`}</span>
    </div>
  );
};

// Export as a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(WarehouseIconButton), {
  ssr: false,
});
