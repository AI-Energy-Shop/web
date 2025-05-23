import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Package2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';

interface InventoryItemProps {
  control: Control<any>;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ control }) => {
  return (
    <div
      className={cn(
        'relative flex items-start gap-6 p-4 rounded-lg border border-border/40',
        'transition-all duration-200 group'
      )}
    >
      <div className="flex-1 space-y-6">
        <div className="space-y-2.5">
          <FormField
            control={control}
            name={`inventory.melbourne`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={`inventory.melbourne`}>Melbourne</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      {...field}
                      // disabled
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2.5">
          <FormField
            control={control}
            name={`inventory.sydney`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={`inventory.sydney`}>Sydney</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      {...field}
                      // disabled
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2.5">
          <FormField
            control={control}
            name={`inventory.brisbane`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={`inventory.brisbane`}>Brisbane</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      {...field}
                      // disabled
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
    </div>
  );
};

export default InventoryItem;
