import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AddressForm from '../Form/AddressForm';
import { AddressSchemaWithIdTypes } from './AddressList';

type EditAddressDialogProps = {
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  updateAddressDetails: AddressSchemaWithIdTypes | undefined;
};

function EditAddressDialog({
  openEditDialog,
  setOpenEditDialog,
  updateAddressDetails,
}: EditAddressDialogProps) {
  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddressForm
          address={updateAddressDetails}
          setCloseModal={setOpenEditDialog}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditAddressDialog;
