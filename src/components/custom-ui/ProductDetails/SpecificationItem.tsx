import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Trash2 } from 'lucide-react';
import React, { FC } from 'react';

interface SpecificationItemProps {
  index?: number;
  title?: string;
  item?: {
    key: string;
    value: number | string;
  };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index?: number, title?: any) => void;
}
const SpecificationItem: FC<SpecificationItemProps> = ({ index, item, title, onChange, onRemove }) => {
  return (
    <div className="border flex items-center justify-between gap-5 py-5 px-3 rounded-lg group">
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <Label>Key</Label>
          <Input
            type="text"
            data-index={index}
            data-title={title}
            id={`key-${index}`}
            name="key"
            value={item?.key || ''}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center gap-1">
          <Label>Value</Label>
          <Input
            type="text"
            data-index={index}
            data-title={title}
            id={`value-${index}`}
            name="value"
            value={item?.value || ''}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="hidden group-hover:block">
        <Button onClick={() => onRemove(index, title)} size="icon" className="relative right-0">
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default SpecificationItem;
