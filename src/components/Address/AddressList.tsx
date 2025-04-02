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

function AddressList() {
  const [addresses, setAdressess] = useState([
    {
      name: 'Home Address',
      street: '123 Example Street',
      locality: 'Sydney',
      state: 'NSW',
      postCode: '2000',
      country: 'Australia',
      default: true,
    },
    {
      name: 'Office Address',
      street: '123 Example Street',
      locality: 'Sydney',
      state: 'NSW',
      postCode: '2000',
      country: 'Australia',
      default: false,
    },
  ]);

  return (
    <div className="space-y-4">
      {addresses?.map((address, i) => (
        <Card
          key={i}
          className={`relative border ${address.default && 'border-orange-orange bg-orange-orange/5'}`}
        >
          <MapPin className="absolute left-5 top-[26px]" />

          <div className="absolute right-6 top-5 space-x-4">
            <EditAddressDialog />
            <DeleteAddressDialog />
          </div>
          <CardHeader className="pl-16 max-sm:max-w-44">
            <CardTitle className="text-lg">{address.name}</CardTitle>
          </CardHeader>
          <CardContent className="pl-16">
            <p>{`${address.street}`}</p>
            <p>{`${address.state} ${address.locality} ${address.postCode}`}</p>
            <p>{address.country}</p>
          </CardContent>
          {address.default && (
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
