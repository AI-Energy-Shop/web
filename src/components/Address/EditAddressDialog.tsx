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

function EditAddressDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
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
