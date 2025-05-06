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
    <div className="relative flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      <Input
        type="text"
        data-index={index}
        data-title={title}
        id={`key-${item?.id}`}
        name="feature"
        value={item?.feature || ''}
        onChange={onChange}
        className="flex-1 text-sm bg-transparent border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
        placeholder="Enter feature..."
      />
      <Button
        onClick={() => onRemove(index, title)}
        size="sm"
        variant="ghost"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default KeyFeatureItem;
