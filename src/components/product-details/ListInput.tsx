'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ListInputProps {
  title: string;
  formData: any[];
  addButtonLabel?: string;
  childComponent?: any;
  stayExpanded?: boolean;
  isDirty?: boolean;
  onAddList: () => void;
}

const ListInput: React.FC<ListInputProps> = ({
  formData,
  title,
  addButtonLabel,
  childComponent,
  stayExpanded = false,
  isDirty = false,
  onAddList,
}) => {
  const [isExpanded, setIsExpanded] = useState(stayExpanded);
  const newtitle = title.toLowerCase().replaceAll(' ', '_') as any;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const listLength = formData.length;

  return (
    <Card className="w-full">
      <CardHeader
        className={cn(
          'flex flex-row items-center cursor-pointer select-none',
          'transition-colors duration-200 hover:bg-gray-50/80',
          isExpanded && 'border-b'
        )}
        onClick={toggleExpand}
      >
        <div className="flex-1 flex items-center gap-3">
          <ChevronDown
            className={cn(
              'h-4 w-4 text-gray-500 transition-transform duration-200',
              isExpanded && 'transform rotate-180'
            )}
          />
          <CardTitle className="text-md font-medium flex items-center gap-2">
            {title}
            {formData && formData?.length > 0 && (
              <Badge
                variant="secondary"
                className="h-5 px-2 text-xs font-normal"
              >
                {formData?.length}
              </Badge>
            )}
          </CardTitle>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddList();
            if (!isExpanded) setIsExpanded(true);
          }}
          size="sm"
          variant="outline"
          className="ml-auto"
          type="button"
        >
          {addButtonLabel}
        </Button>
      </CardHeader>

      <div
        className={cn(
          'grid transition-all duration-200',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <CardContent
            className={cn(
              'space-y-3 py-4',
              listLength === 0 && 'text-center text-sm text-gray-500'
            )}
          >
            {listLength === 0 ? (
              <p>No items added yet</p>
            ) : (
              formData?.map?.((item, index) =>
                React.cloneElement(childComponent, {
                  key: index,
                  item,
                  index,
                  title: newtitle,
                })
              )
            )}
          </CardContent>
          <CardFooter className="px-6 pb-4 flex justify-end gap-2"></CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ListInput;
