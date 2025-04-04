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
import { addNewAddress, updateAddress } from '@/app/actions/address';
import { toast } from 'sonner';
import { AddressSchemaWithIdTypes } from '../Address/AddressList';

interface AddressFormProps {
  address?: AddressSchemaWithIdTypes;
  setCloseModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddressForm({ address, setCloseModal }: AddressFormProps) {
  const form = useForm<AddressSchemaWithIdTypes>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: address?.title || '',
      street1: address?.street1 || '',
      street2: address?.street2 || '',
      city: address?.city || '',
      state: address?.state || '',
      country: address?.country || '',
      zip_code: address?.zip_code || '',
      mobile: address?.mobile || '',
      phone: address?.phone || '',
      isActive: address?.isActive || false,
    },
  });

  const onSubmit = async (values: AddressSchemaWithIdTypes) => {
    try {
      if (!address) {
        await addNewAddress(values);
      } else {
        await updateAddress(address.id, values);
      }
    } catch (error) {
      toast.error('Server Error');
    } finally {
      if (setCloseModal) {
        setCloseModal(false);
      }
    }
  };

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
            name="zip_code"
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
