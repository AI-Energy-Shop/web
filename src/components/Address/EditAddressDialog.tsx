import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import AddressForm from '../Form/AddressForm';

type EditAddressDialogProps = {
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditAddressDialog({}: EditAddressDialogProps) {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddressForm />
      </DialogContent>
    </Dialog>
  );
}

export default EditAddressDialog;
