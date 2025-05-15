import React from 'react';
import { Input } from '@/components/ui/input';
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
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface InventoryItemProps {
  index?: number;
  title?: string;
  control: Control<any>;
  onRemove: (index?: number, title?: any) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  index,
  title,
  control,
  onRemove,
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
          <FormField
            control={control}
            name={`inventories.${index}.location_code`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={`inventories.${index}.location_code`}>
                  Warehouse Location
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse location" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((location, index) => (
                        <SelectItem key={location + index} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2.5">
          <FormField
            control={control}
            name={`inventories.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={`inventories.${index}.quantity`}>
                  Quantity
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Button
        size="sm"
        type="button"
        variant="ghost"
        onClick={() => onRemove(index, title)}
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
