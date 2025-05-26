import React from 'react';
import { Button } from '../ui/button';
import {
  DialogTrigger,
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Row } from '@tanstack/react-table';

interface ProductBulkActionProps {
  actionId: string;
  actionName: string;
  actionDescription: string;
  selectedRows: Row<any>[];
  submitButtonText: string;
  submitButtonVariant: 'default' | 'secondary' | 'destructive' | 'ghost';
  onSubmit: (actionName: string) => void;
}

const ProductBulkAction: React.FC<ProductBulkActionProps> = ({
  actionId,
  actionName,
  actionDescription,
  selectedRows,
  submitButtonText,
  submitButtonVariant,
  onSubmit,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          {actionName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{actionName}</DialogTitle>
          <DialogDescription>
            {actionDescription}
            {selectedRows.length} selected row(s).
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4"></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            size="sm"
            variant={submitButtonVariant}
            onClick={() => onSubmit(actionId)}
          >
            {submitButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductBulkAction;
