import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LOCATIONS } from '@/constant';
import { on } from 'events';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InventoryItemProps {
  index?: number;
	title?: string
  item?: {
    location: string;
    quantity: number | string;
  };
	onChangeSelectLocation: (value?: any, index?: number) => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inventory?: any[]
}

const InventoryItem: React.FC<InventoryItemProps> = ({ index, item, title, inventory, onChange, onChangeSelectLocation}) => {

  return (
    <div className="flex gap-5 border p-2 rounded-lg">
      <div className="space-y-2">
        <Label htmlFor={`location-${index}`}>Location</Label>
        <Select 
					name="user_level"
					data-index={index}
					data-title={title}
					value={item?.location || ''}
					onValueChange={(value) => onChangeSelectLocation(value, Number(index))}
				
				>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent defaultValue={LOCATIONS[0]}>
            {LOCATIONS.map((location, index) => {
              return (
                <SelectItem key={index} value={location}>
                  {location}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
        <div className="relative">
          <Input
            id={`quantity-${index}`}
            type="number"
						name='quantity'
            placeholder="0.00"
						data-index={index}
						data-title={title}
            className="w-[180px] px-5"
            value={item?.quantity || ""}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryItem;
