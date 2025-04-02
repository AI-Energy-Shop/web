import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { deleteAddress } from '@/app/actions/address';
import { toast } from 'sonner';

type DeleteAddressDialogProps = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
  deleteAddressId: string;
};

function DeleteAddressDialog({
  openDeleteDialog,
  setOpenDeleteDialog,
  deleteAddressId,
}: DeleteAddressDialogProps) {
  const continueDeleteAddress = async () => {
    try {
      await deleteAddress(deleteAddressId);
    } catch (error) {
      toast.error('Server Error');
    } finally {
      if (setOpenDeleteDialog) {
        setOpenDeleteDialog(false);
      }
    }
  };

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this?</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end gap-x-4">
          <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={continueDeleteAddress}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAddressDialog;
