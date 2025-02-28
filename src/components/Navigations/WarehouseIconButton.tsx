'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Warehouse } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Me } from '@/store/features/me';

const WarehouseIconButton = () => {
  const me = useSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);

  useEffect(() => {
    if (me) {
      setUser(me);
    }
  }, [me]);

  if (user?.shipping_addresses?.length === 0) {
    return null;
  }

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
