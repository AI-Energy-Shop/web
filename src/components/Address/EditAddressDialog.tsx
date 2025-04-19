import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddressForm from '../Form/AddressForm';
import { AddressSchemaWithDocumentIdTypes } from './AddressList';
import { AddressQuery } from '@/lib/gql/graphql';

type EditAddressDialogProps = {
  openEditDialog: boolean;
  setOpenEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
  updateAddressDetails: AddressSchemaWithDocumentIdTypes | undefined;
  address: AddressQuery;
};

function EditAddressDialog({
  openEditDialog,
  setOpenEditDialog,
  updateAddressDetails,
  address,
}: EditAddressDialogProps) {
  return (
    <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <AddressForm
          selectedAddressToUpdate={updateAddressDetails}
          setCloseModal={setOpenEditDialog}
          allAddress={address}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditAddressDialog;
