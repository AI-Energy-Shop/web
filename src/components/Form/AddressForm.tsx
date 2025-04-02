'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { addressSchema } from '@/lib/validation-schema/address-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import StateComboBox from '../Address/StateComboBox';
import CountryComboBox from '../Address/CountryComboBox';

type AddressSchemaTypes = z.infer<typeof addressSchema>;

interface AddressFormProps {
  address?: AddressSchemaTypes;
}

function AddressForm({ address }: AddressFormProps) {
  const form = useForm<AddressSchemaTypes>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: '',
      zipCode: undefined,
      mobile: '',
      phone: '',
      isActive: false,
    },
  });

  const onSubmit = (values: AddressSchemaTypes) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Address Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="sm:flex sm:items-center sm:gap-x-2">
          <FormField
            control={form.control}
            name="street1"
            render={({ field }) => (
              <FormItem className="flex-1 relative">
                <FormLabel>
                  Street1<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street2"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Street2</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="sm:flex sm:items-end sm:gap-x-2 max-sm:space-y-2">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <StateComboBox form={form} />
          <CountryComboBox form={form} />
        </div>

        <div className="flex items-center gap-x-2">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="pb-1.5">Set as default address</FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-blue-navy-blue hover:bg-blue-navy-blue/90 "
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AddressForm;
