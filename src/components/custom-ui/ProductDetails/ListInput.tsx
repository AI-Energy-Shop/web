'use client';
import React from 'react';
import { Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { arrayIsEqual } from '@/lib/utils';

interface ListInputProps {
  data: any[];
  title: string;
  addButtonLabel?: string;
  childComponent?: any;
  onAddList: () => void;
  onSave: (data: any) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListInput: React.FC<ListInputProps> = ({
  data,
  title,
  addButtonLabel,
  childComponent,
  onSave,
  onChange,
  onAddList,
}) => {
  const [list, setList] = useState(data);
  const newtitle = title.toLowerCase().replaceAll(' ', '_');

  const handleSave = (data: any) => {
    setList(data);
    onSave(data);
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-md font-bold">{title}</CardTitle>
          <Button onClick={onAddList} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {addButtonLabel}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.map?.((item, index) =>
              React.cloneElement(childComponent, {
                key: index,
                item,
                index,
                title: newtitle,
                onChange: (e: any) => onChange(e),
              })
            )}
            {/* {list?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No price lists added. Click the &quot;Add Price&quot; button to
                create one
              </div>
            )} */}
          </div>
        </CardContent>
        <CardFooter>
          {!arrayIsEqual(data, list) && (
            <Button onClick={() => handleSave(data)}>Save</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ListInput;
