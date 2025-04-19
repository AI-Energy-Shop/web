import { ChangeEvent } from 'react';
import { USER_LEVELS } from '@/constant';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PriceListItem {
  onRemove: (index?: number, title?: any) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string, index?: number) => void;
  index?: number;
  title?: string;
  item?: {
    price: string;
    sale_price: string;
    documentId: string;
    min_quantity: string;
    max_quantity: string;
    user_level: string;
  };
}

const PriceListItem: React.FC<PriceListItem> = ({ onRemove, onChange, onSelectChange, index, item, title }) => {
  return (
    <div className="grid gap-4 p-4 border rounded-lg relative">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`price-${index}`}>Sale Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id={`sale-price-${index}`}
                type="number"
                name="sale_price"
                data-index={index}
                data-title={title}
                placeholder="0.00"
                className="pl-7"
                value={item?.sale_price || ''}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`price-${index}`}>Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id={`price-${index}`}
                type="number"
                name="price"
                data-index={index}
                data-title={title}
                placeholder="0.00"
                className="pl-7"
                value={item?.price || ''}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`min-quantity-${index}`}>Min Quantity</Label>
            <Input
              id={`min-quantity-${index}`}
              type="number"
              placeholder="0"
              name="min_quantity"
              data-index={index}
              data-title={title}
              value={item?.min_quantity || ''}
              onChange={onChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`max-quantity-${index}`}>Max Quantity</Label>
            <Input
              id={`max-quantity-${index}`}
              type="number"
              placeholder="0"
              name="max_quantity"
              data-index={index}
              data-title={title}
              value={item?.max_quantity || ''}
              onChange={onChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`user-level-${index}`}>User Level</Label>
            <Select
              name="user_level"
              data-index={index}
              data-title={title}
              value={item?.user_level || ''}
              onValueChange={(value) => onSelectChange(value, index)}
            >
              <SelectTrigger>
                <SelectValue placeholder="User level" />
              </SelectTrigger>
              <SelectContent defaultValue={USER_LEVELS[0]}>
                {USER_LEVELS.map((level, index) => (
                  <SelectItem key={level + index} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Button onClick={() => onRemove(index, title)} size="icon" className="relative right-0">
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default PriceListItem;
