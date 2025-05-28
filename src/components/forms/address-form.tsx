'use client';
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
import { addressSchema } from '@/lib/validation-schema/address-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import StateComboBox from '../Address/StateComboBox';
import CountryComboBox from '../Address/CountryComboBox';
import {
  addNewAddress,
  updateAddress,
  updateAddressIsActiveToFalse,
} from '@/app/actions/address';
import { toast } from 'sonner';
import { AddressSchemaWithDocumentIdTypes } from '../Address/AddressList';
import { AddressQuery } from '@/lib/gql/graphql';
import { checkIfSuburbIsValid } from '@/app/actions/macship';

interface AddressFormProps {
  selectedAddressToUpdate?: AddressSchemaWithDocumentIdTypes;
  setCloseModal?: React.Dispatch<React.SetStateAction<boolean>>;
  allAddress?: AddressQuery;
}

type AddressSchemaTypes = z.infer<typeof addressSchema>;

function AddressForm({
  selectedAddressToUpdate,
  setCloseModal,
  allAddress,
}: AddressFormProps) {
  const form = useForm<AddressSchemaTypes>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      title: selectedAddressToUpdate?.title || '',
      street1: selectedAddressToUpdate?.street1 || '',
      street2: selectedAddressToUpdate?.street2 || '',
      city: selectedAddressToUpdate?.city || '',
      state: selectedAddressToUpdate?.state || '',
      country: selectedAddressToUpdate?.country || '',
      zip_code: selectedAddressToUpdate?.zip_code || '',
      mobile: selectedAddressToUpdate?.mobile || '',
      phone: selectedAddressToUpdate?.phone || '',
      isActive: selectedAddressToUpdate?.isActive || false,
    },
  });

  const allAddressWithIsActiveTrue =
    allAddress?.usersPermissionsUser?.addresses.filter(
      (address) => address?.isActive === true
    );

  const onSubmit = async (values: AddressSchemaTypes) => {
    let doesFillingUpSuccess = true;

    const isSuburbAndPosCodeValid = await checkIfSuburbIsValid(
      values.city,
      values.zip_code
    );

    if (!isSuburbAndPosCodeValid) {
      form.setError('city', { message: 'Fix spelling.' });
      form.setError('zip_code', {
        message: 'Fix zip.',
      });
      return;
    }

    try {
      if (!selectedAddressToUpdate) {
        const doesHaveSameTitleAddress =
          allAddress?.usersPermissionsUser?.addresses.some(
            (address) =>
              address?.title?.toLowerCase() === values.title?.toLowerCase()
          );

        if (doesHaveSameTitleAddress) {
          doesFillingUpSuccess = false;

          form.setError('title', {
            message: 'Duplicate title',
          });
        }
        if (doesFillingUpSuccess) {
          if (values.isActive) {
            allAddressWithIsActiveTrue?.forEach(async (address) => {
              await updateAddressIsActiveToFalse(address?.documentId!);
            });
          }

          await addNewAddress(values);
        }
      }
      if (selectedAddressToUpdate) {
        const doesHaveSameTitleAddress =
          allAddress?.usersPermissionsUser?.addresses.some((address) => {
            if (address?.documentId === selectedAddressToUpdate.documentId) {
              return false;
            }
            return (
              address?.title?.toLowerCase() === values.title?.toLowerCase()
            );
          });

        if (doesHaveSameTitleAddress) {
          doesFillingUpSuccess = false;

          form.setError('title', {
            message: 'Duplicate title',
          });
        }
        if (doesFillingUpSuccess) {
          if (values.isActive) {
            const allAddressNotIncludingAddressYourUpdating =
              allAddressWithIsActiveTrue?.filter(
                (address) =>
                  address?.documentId !== selectedAddressToUpdate.documentId
              );

            allAddressNotIncludingAddressYourUpdating?.forEach(
              async (address) => {
                await updateAddressIsActiveToFalse(address?.documentId!);
              }
            );
          }

          await updateAddress(selectedAddressToUpdate.documentId, values);
        }
      }
    } catch (error) {
      toast.error('Server Error');
    } finally {
      if (setCloseModal && doesFillingUpSuccess) {
        setCloseModal(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <FormMessage />
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
              <FormItem className="flex-1 sm:relative">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="sm:absolute sm:-bottom-5" />
              </FormItem>
            )}
          />
        </div>
        <div className="sm:flex sm:items-end sm:gap-x-2 max-sm:space-y-2">
          <FormField
            control={form.control}
            name="zip_code"
            render={({ field }) => (
              <FormItem className="flex-1 sm:relative">
                <FormLabel>Zip</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="sm:absolute sm:-bottom-5" />
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
