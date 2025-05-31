'use client';

import React from 'react';
import { Warehouse } from 'lucide-react';
import { RootState, useAppSelector } from '@/store/store';
import Link from 'next/link';

const WarehouseIconButton = () => {
  const warehouse = useAppSelector(
    (state: RootState) => state.me.me?.account_detail?.warehouseLocation?.name
  );
  return (
    <div className="h-[40px] flex flex-col items-center justify-between">
      <Link
        href="/auth/login"
        className="flex flex-col items-center m-0 w-auto h-auto px-1"
      >
        <Warehouse className="h-4 w-4 lg:h-5 lg:w-5" />
        <p className="text-xs lg:text-sm h-[15px] capitalize">
          {warehouse || 'Warehouse'}
        </p>
      </Link>
    </div>
  );
};

export default WarehouseIconButton;
