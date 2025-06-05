'use client';

import { Check, MapPin, Pencil, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import EditAddressDialog from './EditAddressDialog';
import DeleteAddressDialog from './DeleteAddressDialog';
import { AddressQuery } from '@/lib/gql/graphql';
import { Button } from '../ui/button';
import { addressSchema } from '@/lib/validation-schema/address-form';
import { z } from 'zod';
import { useCheckout } from '@/hooks/useCheckout';

type AddressListProps = {
  data: AddressQuery;
};

type AddressSchemaTypes = z.infer<typeof addressSchema>;

export type AddressSchemaWithDocumentIdTypes = AddressSchemaTypes & {
  documentId: string;
};

function AddressList({ data }: AddressListProps) {
  const [deleteAddressId, setDeleteAddressId] = useState<string>('');
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [updateAddressDetails, setUpdateAddressDetails] =
    useState<AddressSchemaWithDocumentIdTypes>();

  const { shippingAddress, setShippingAddress } = useCheckout();

  const addresses = data?.usersPermissionsUser?.addresses;

  return (
    <div className="space-y-4">
      <EditAddressDialog
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        updateAddressDetails={updateAddressDetails}
        address={data}
      />
      <DeleteAddressDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        deleteAddressId={deleteAddressId}
      />
      {addresses?.map((address) => (
        <Card
          key={address?.documentId}
          onClick={() => {
            setShippingAddress({
              city: address?.city || '',
              country: address?.country || '',
              odoo_address_id: address?.odoo_address_id || '',
              state: address?.state || '',
              street1: address?.street1 || '',
              street2: address?.street2 || '',
              title: address?.title || '',
              zip_code: address?.zip_code || '',
            });
          }}
          className={`relative border cursor-pointer ${shippingAddress?.title === address?.title && 'border-orange-orange bg-orange-orange/5'}`}
        >
          <MapPin className="absolute left-5 top-[26px]" />
          <div className="absolute right-6 top-5 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setUpdateAddressDetails({
                  documentId: address?.documentId!,
                  title: address?.title!,
                  street1: address?.street1!,
                  street2: address?.street2!,
                  city: address?.city!,
                  state: address?.state!,
                  country: address?.country!,
                  zip_code: address?.zip_code!,
                  isActive: address?.isActive!,
                  mobile: address?.mobile!,
                  phone: address?.phone!,
                });
                setOpenEditDialog(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                setOpenDeleteDialog(true);
                setDeleteAddressId(address?.documentId!);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <CardHeader className="pl-16 max-sm:max-w-44">
            <CardTitle className="text-lg">{address?.title}</CardTitle>
          </CardHeader>
          <CardContent className="pl-16">
            <p>{`${address?.street1}, ${address?.street2}`}</p>
            <p>{`${address?.state} ${address?.city} ${address?.zip_code}`}</p>
            <p>{address?.country}</p>
            <p>{address?.mobile}</p>
            <p>{address?.phone}</p>
          </CardContent>
          {address?.isActive && (
            <CardFooter className="pl-16 flex items-center gap-x-1 text-orange-orange">
              <Check className="w-5 h-5" />
              <p>Default address</p>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}

export default AddressList;
