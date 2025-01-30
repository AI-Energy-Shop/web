import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface ProductFilterItemProps {
  name: string;
}

const ProductFilterItem: React.FC<ProductFilterItemProps> = ({ name }) => {
  return (
    <div className="mb-4">
      <Button
        variant="ghost"
        className="w-full justify-between font-normal text-base"
      >
        {name}
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductFilterItem;
