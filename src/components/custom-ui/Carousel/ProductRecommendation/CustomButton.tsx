import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ButtonGroupProps } from 'react-multi-carousel';

function ButtonGroup({ next, previous, goToSlide, ...rest }: ButtonGroupProps) {
  return (
    <div className="absolute z-0 top-0 left-0 h-full w-full">
      <div className="relative h-full">
        <Button
          size="icon"
          variant="ghost"
          className="absolute h-1/3 w-9 -left-10 border bg-white hover:bg-white/90 border-purple-purp-aes rounded-full top-1/2 transform -translate-y-1/2"
          onClick={() => previous!()}
        >
          <ChevronLeft />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="absolute h-1/3 w-9 -right-10 border bg-white hover:bg-white/90 border-purple-purp-aes rounded-full top-1/2 transform -translate-y-1/2"
          onClick={() => next!()}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default ButtonGroup;
