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
import { Dispatch, SetStateAction } from 'react';

type AddressSchemaTypes = z.infer<typeof addressSchema>;

interface AddressFormProps {
  address?: AddressSchemaTypes;
  setAddresses: Dispatch<
    SetStateAction<
      {
        name: string;
        street: string;
        locality: string;
        state: string;
        postCode: string;
        country: string;
        default: boolean;
      }[]
    >
  >;
}

function AddressForm({ address, setAddresses }: AddressFormProps) {
  const form = useForm<AddressSchemaTypes>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: address?.name || '',
      street: address?.street || '',
      locality: address?.locality || '',
      state: address?.state || '',
      postCode: address?.postCode || '',
      country: address?.country || '',
      default: address?.default || false,
    },
  });

  function onSubmit(values: AddressSchemaTypes) {
    if (!address) {
      setAddresses((prev) => {
        if (values.default) {
          prev.map((address) => (address.default = false));
          return [values, ...prev];
        }

        return [values, ...prev];
      });
    } else {
      setAddresses((prev) => {
        return prev.map((address) => {
          if (address.name === values.name) {
            return {
              name: values.name,
              street: values.street,
              locality: values.locality,
              state: values.state,
              postCode: values.postCode,
              country: values.country,
              default: values.default,
            };
          } else {
            return { ...address, default: false };
          }
        });
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <FormField
          control={form.control}
          name="default"
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
