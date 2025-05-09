import { Button } from '@/components/ui/button';
import { FormControl, FormMessage } from '@/components/ui/form';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { Control } from 'react-hook-form';

const KeyFeatureItem = ({
  index,
  title,
  control,
  onRemove,
}: {
  index?: number;
  title?: string;
  item?: {
    id?: string;
    feature: string;
    value: number | string;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index?: number, title?: any) => void;
  control: Control<any>;
}) => {
  return (
    <div className="relative flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      <FormField
        control={control}
        name={`key_features.${index}.feature`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Value</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter feature..."
                className="flex-1 text-sm bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        size="sm"
        type="button"
        variant="ghost"
        onClick={() => onRemove(index, title)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default KeyFeatureItem;
