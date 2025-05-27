'use client';

import { Button } from '@/components/ui/button';
import useProductFilter from '@/hooks/useProductFilter';
import { SlidersHorizontal } from 'lucide-react';
import React from 'react';

const MobileButton = () => {
  const { setShowMobileFilters } = useProductFilter();

  return (
    <div className="w-full block md:hidden">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowMobileFilters(true)}
      >
        <SlidersHorizontal />
        Filter & Sort
      </Button>
    </div>
  );
};

export default MobileButton;
