import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface PopoverButtonProps {
  triggerComponent: React.ReactNode;
  contentClassName?: string;
  children: React.ReactNode;
}

const PopoverButton = ({
  triggerComponent,
  contentClassName,
  children,
}: PopoverButtonProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerComponent}</PopoverTrigger>
      <PopoverContent className={cn(contentClassName)}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverButton;
