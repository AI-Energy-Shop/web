'use client';
import { userProfileSchema } from '@/lib/validation-schema/user-profile-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { USER_LEVEL, USER_STATUS, USER_TYPE } from '@/lib/constant';
import { Textarea } from '../ui/textarea';
import { UsersPermissionsUserQuery } from '@/lib/gql/graphql';
import { Save } from 'lucide-react';

type UserProfileFormProps = {
  user: UsersPermissionsUserQuery['usersPermissionsUser'];
};

const UserProfileForm = ({ user }: UserProfileFormProps) => {
  // TODO (ROI) there is no phone data, address and company too

  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: user?.account_details?.first_name || '',
      middleName: user?.account_details?.middle_name || '',
      lastName: user?.account_details?.last_name || '',
      email: user?.email || '',
      level: user?.account_details?.level || '',
      status: user?.account_status || '',
      phone: '',
      company: '',
      odooId: user?.account_details?.odoo_id || '',
      type: user?.account_details?.user_type || '',
      australianBusinessNumber: user?.account_details?.business_name || '',
      address: '',
    },
  });

  function onSubmit(values: z.infer<typeof userProfileSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={USER_LEVEL.SMALL}>SMALL</SelectItem>
                    <SelectItem value={USER_LEVEL['MID-SIZED']}>
                      MID-SIZED
                    </SelectItem>
                    <SelectItem value={USER_LEVEL.VIP}>VIP</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={USER_STATUS.PENDING}>Pending</SelectItem>
                    <SelectItem value={USER_STATUS.REVIEWING}>
                      Reviewing
                    </SelectItem>
                    <SelectItem value={USER_STATUS.APPROVED}>
                      Approved
                    </SelectItem>
                    <SelectItem value={USER_STATUS.DENIED}>Denied</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="odooId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Odoo Id</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={USER_TYPE.INSTALLER}>
                      Installer
                    </SelectItem>
                    <SelectItem value={USER_TYPE.RETAILER}>Retailer</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="australianBusinessNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Australian Business Number</FormLabel>
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UserProfileForm;