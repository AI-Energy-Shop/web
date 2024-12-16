'use client';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import AddressForm from '@/components/custom-ui/Forms/AddressForm';

function AddressPage() {
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

  const [newAddressModal, setNewAddressModal] = useState<boolean>(false);

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
            </DialogHeader>
            <AddressForm setAddresses={setAdressess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {addresses?.map((address, i) => (
          <Card
            key={i}
            className={`relative border ${address.default && 'border-orange-orange bg-orange-orange/5'}`}
          >
            <MapPin className="absolute left-5 top-[26px]" />

            <div className="absolute right-6 top-5 space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Address</DialogTitle>
                  </DialogHeader>
                  <AddressForm address={address} setAddresses={setAdressess} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to delete this?
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 flex justify-end gap-x-4">
                    <Button variant="outline">Cancel</Button>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        setAdressess((prev) =>
                          prev.filter((item) => item.name !== address.name)
                        )
                      }
                    >
                      Continue
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
    </main>
  );
}

export default AddressPage;
