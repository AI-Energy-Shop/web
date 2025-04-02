import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddressForm from '@/components/Form/AddressForm';
import AddressList from '@/components/Address/AddressList';

function AddressPage() {
  return (
    <main className="pt-[75px] min-h-screen ae-mobile-container ae-non-mobile-container space-y-4">
      <div className="max-sm:space-y-2 sm:flex sm:justify-between sm:items-center">
        <h1 className="text-2xl font-semibold">My Adresses</h1>
        <Dialog>
          <DialogTrigger asChild>
            <div>
              <Button className="max-sm:w-full bg-blue-navy-blue hover:bg-blue-navy-blue sm:flex sm:items-center sm:gap-x-2">
                <Plus className="w-5 h-5" />
                <p className="hidden sm:block">Add New Address</p>
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <AddressForm />
          </DialogContent>
        </Dialog>
      </div>

      <AddressList />
    </main>
  );
}

export default AddressPage;
