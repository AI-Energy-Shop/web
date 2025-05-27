import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { ButtonGroupProps } from 'react-multi-carousel';

function RightButton({ next, previous, goToSlide, ...rest }: ButtonGroupProps) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute -right-3 top-1/2 transform -translate-y-1/2"
      onClick={() => next!()}
    >
      <ChevronRight />
    </Button>
  );
}

export default RightButton;
