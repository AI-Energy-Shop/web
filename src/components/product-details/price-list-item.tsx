'use client';
import { USER_LEVELS } from '@/constant';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface PriceListItem {
  control: Control<any>;
  onRemove: (index?: number, title?: any) => void;
  index?: number;
  title?: string;
  currency: string;
}

const PriceListItem: React.FC<PriceListItem> = ({
  onRemove,
  index,
  title,
  currency,
  control,
}) => {
  return (
    <Card className="group">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <FormField
              control={control}
              name={`price_lists.${index}.price`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={`price.${index}`}>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      <span>{currency}</span>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={control}
              name={`price_lists.${index}.comparePrice`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={`comparePrice.${index}`}>
                    Reduced Price
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      <span>{currency}</span>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={control}
              name={`price_lists.${index}.min_quantity`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={`min-quantity.${index}`}>
                    Min Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={control}
              name={`price_lists.${index}.max_quantity`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={`max-quantity.${index}`}>
                    Max Quantity
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      <span>{currency}</span>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={control}
              name={`price_lists.${index}.user_level`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor={`price_lists.${index}.user_level`}>
                    User Level
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={USER_LEVELS.at(0)?.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={USER_LEVELS.at(0)?.name} />
                      </SelectTrigger>
                      <SelectContent>
                        {USER_LEVELS.map((level, index) => (
                          <SelectItem
                            key={level.name + index}
                            value={level.value}
                          >
                            {level.name}
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          size="icon"
          type="button"
          onClick={() => onRemove(index, title)}
          className="group-hover:visible invisible relative right-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriceListItem;
