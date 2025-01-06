import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import React from 'react';

const KeyFeatureItem = ({
  index,
  title,
  item,
  onChange,
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
}) => {
  return (
    <div className="border rounded-md flex justify-between gap-5 py-5 px-3 group">
      <Input
        type="text"
        data-index={index}
        data-title={title}
        id={`key-${item?.id}`}
        name="feature"
        value={item?.feature || ''}
        onChange={onChange}
        className="outline-none border-none shadow-none"
      />
      <div className="hidden group-hover:block">
        <Button
          onClick={() => onRemove(index, title)}
          size="icon"
          className="relative right-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default KeyFeatureItem;
