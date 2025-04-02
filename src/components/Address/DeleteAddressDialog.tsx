import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

function DeleteAddressDialog() {
  const [closeDialog, setCloseDialog] = useState<boolean>(false);

  return (
    <Dialog open={closeDialog} onOpenChange={setCloseDialog}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end gap-x-4">
          <Button variant="outline" onClick={() => setCloseDialog(false)}>
            Cancel
          </Button>
          <Button variant="destructive">Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAddressDialog;
