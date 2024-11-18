import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ButtonGroupProps } from 'react-multi-carousel';

function ButtonGroup({ next, previous, goToSlide, ...rest }: ButtonGroupProps) {
  return (
    <div className="absolute -bottom-[8px] left-1/2 transform -translate-x-1/2">
      <div className="relative">
        <Button
          size="icon"
          variant="ghost"
          className="absolute -left-16 top-[-38px]"
          onClick={() => previous!()}
        >
          <ChevronLeft />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-[-60px] top-[-38px]"
          onClick={() => next!()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default ButtonGroup;
