'use client';

import React, { useEffect, useState } from 'react';
import { Warehouse } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { WarehouseLocation } from '@/store/features/cart';
const WarehouseIconButton = () => {
  const warehouseLocation = useSelector(
    (state: RootState) => state.cart.warehouseLocation
  );
  const [warehouseLocationState, setWarehouseLocationState] = useState<
    WarehouseLocation | undefined
  >(undefined);

  useEffect(() => {
    if (warehouseLocation) {
      setWarehouseLocationState(warehouseLocation);
    }
  }, [warehouseLocation]);

  return (
    <Link
      href="/profile#warehouseAddress"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <Warehouse className="h-5 w-5" />
      {warehouseLocationState ? (
        <p className="text-sm font-normal">
          {warehouseLocationState.address.city}
        </p>
      ) : (
        <p className="text-sm font-normal">Warehouse</p>
      )}
    </Link>
  );
};

export default WarehouseIconButton;
