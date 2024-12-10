'use client';
import { Button } from '@/components/ui/button';
import { Check, MapPin, Plus } from 'lucide-react';
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
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string(),
  street: z.string(),
  locality: z.string(),
  state: z.string(),
  postCode: z.string(),
  country: z.string(),
});

function AddressPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      street: '',
      locality: '',
      state: '',
      postCode: '',
      country: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [addresses, setAdressess] = useState([
    {
      name: 'Home Address',
      street: '123 Example Street',
      locality: 'Sydney',
      state: 'NSW',
      postCode: '2000',
      country: 'Australia',
    },
  ]);

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-x-2">
                  <FormField
                    control={form.control}
                    name="locality"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Suburb/Locality</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>State/Territory</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-x-2">
                  <FormField
                    control={form.control}
                    name="postCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Postcode</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="default" />
                  <label htmlFor="default" className="text-sm">
                    Set as default address
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-navy-blue hover:bg-blue-navy-blue/90 "
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        {addresses?.map((address, i) => (
          <Card
            key={i}
            className="relative border border-orange-orange bg-orange-orange/5"
          >
            <MapPin className="absolute left-5 top-[26px]" />
            <CardHeader className="pl-16">
              <CardTitle className="text-lg">{address.name}</CardTitle>
            </CardHeader>
            <CardContent className="pl-16">
              <p>{`${address.street}`}</p>
              <p>{`${address.state} ${address.locality} ${address.postCode}`}</p>
              <p>{address.country}</p>
            </CardContent>
            <CardFooter className="pl-16 flex items-center gap-x-1 text-orange-orange">
              <Check className="w-5 h-5" />
              <p>Default address</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

export default AddressPage;
