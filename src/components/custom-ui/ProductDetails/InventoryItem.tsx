import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LOCATIONS } from '@/constant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, Package2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryItemProps {
  index?: number;
  title?: string;
  item?: {
    location_code: string;
    quantity: number | string;
  };
  onChangeSelectLocation: (value?: any, index?: number) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index?: number, title?: any) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  index,
  item,
  title,
  onChange,
  onRemove,
  onChangeSelectLocation,
}) => {
  return (
    <div
      className={cn(
        'relative flex items-start gap-6 p-4 rounded-lg border border-border/40',
        'transition-all duration-200 group',
        'hover:border-primary/20 hover:shadow-sm hover:bg-primary/[0.02]'
      )}
    >
      <div className="flex-none pt-1">
        <Package2 className="w-5 h-5 text-muted-foreground/40" />
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-2.5">
          <Label
            htmlFor={`location-${index}`}
            className="text-sm font-medium text-muted-foreground"
          >
            Warehouse Location
          </Label>
          <Select
            name="user_level"
            data-index={index}
            data-title={title}
            value={item?.location_code || ''}
            onValueChange={(value) => onChangeSelectLocation(value, Number(index))}
          >
            <SelectTrigger
              className={cn(
                'w-full md:w-[280px] h-9 border-border/40',
                'focus:ring-primary/20 focus:border-primary/30',
                'transition-colors duration-200'
              )}
            >
              <SelectValue placeholder="Select warehouse location" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((location, idx) => (
                <SelectItem
                  key={idx}
                  value={location}
                  className="focus:bg-primary/5 focus:text-primary"
                >
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <Label
            htmlFor={`quantity-${index}`}
            className="text-sm font-medium text-muted-foreground"
          >
            Quantity
          </Label>
          <div className="relative">
            <Input
              id={`quantity-${index}`}
              type="number"
              name="quantity"
              placeholder="Enter quantity..."
              data-index={index}
              data-title={title}
              className={cn(
                'w-full md:w-[280px] h-9 pl-4 border-border/40',
                'focus:ring-primary/20 focus:border-primary/30',
                'transition-colors duration-200'
              )}
              value={item?.quantity || ''}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <Button
        onClick={() => onRemove(index, title)}
        size="sm"
        variant="ghost"
        className={cn(
          'flex-none absolute top-1 right-1 w-8 h-8 p-0 opacity-0 group-hover:opacity-100',
          'transition-all duration-200',
          'hover:bg-red-50 hover:text-red-500',
          'rounded-full'
        )}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InventoryItem;
