'use client';

import { Check, MapPin } from 'lucide-react';
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

type AddressListProps = {
  data: AddressQuery;
};

function AddressList({ data }: AddressListProps) {
  const addresses = data?.usersPermissionsUser?.addresses;
  return (
    <div className="space-y-4">
      {addresses?.map((address) => (
        <Card
          key={address?.documentId}
          className={`relative border ${address?.isActive && 'border-orange-orange bg-orange-orange/5'}`}
        >
          <MapPin className="absolute left-5 top-[26px]" />

          <div className="absolute right-6 top-5 space-x-4">
            <EditAddressDialog />
            <DeleteAddressDialog />
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
