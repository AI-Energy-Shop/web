'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddressForm from '../forms/AddressForm';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddressQuery } from '@/lib/gql/graphql';

type AddNewAddressProps = {
  data: AddressQuery;
};

function AddNewAddress({ data }: AddNewAddressProps) {
  const [controlDialog, setControlDialog] = useState<boolean>(false);

  return (
    <Dialog open={controlDialog} onOpenChange={setControlDialog}>
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
        <AddressForm setCloseModal={setControlDialog} allAddress={data} />
      </DialogContent>
    </Dialog>
  );
}

export default AddNewAddress;
