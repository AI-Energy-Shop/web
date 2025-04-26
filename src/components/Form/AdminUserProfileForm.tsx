'use client';
import { userAdminProfileSchema } from '@/lib/validation-schema/user-profile-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import {
  Enum_Accountdetail_Level,
  Enum_Userspermissionsuser_Account_Status,
  UsersPermissionsUserQuery,
} from '@/lib/gql/graphql';
import { Save } from 'lucide-react';

type UserProfileFormProps = {
  user: UsersPermissionsUserQuery['usersPermissionsUser'];
};

const UserProfileForm = ({ user }: UserProfileFormProps) => {
  // TODO (ROI) there is no phone data, address and company
  const form = useForm<z.infer<typeof userAdminProfileSchema>>({
    resolver: zodResolver(userAdminProfileSchema),
    defaultValues: {
      email: user?.email || '',
      level: user?.account_detail?.level || '',
      status: user?.account_status || '',
      phone: user?.account_detail?.phone || '',
      companyName: user?.business_name || '',
      companyNumber: user?.business_number || '',
      odooId: user?.account_detail?.odoo_user_id || '',
      address: '',
    },
  });

  // const { execute, status } = useAction(updateAccountStatus, {
  //   onSuccess(result) {
  //     if (result.data?.error) {
  //       toast.error(
  //         "Status updated to 'Approved'. This change is final and cannot be undone."
  //       );
  //     }
  //   },
  //   onError(error) {
  //     console.log(error);
  //     toast.error('Something went wrong. Please try again later.');
  //   },
  // });

  // async function onSubmit(values: z.infer<typeof userProfileSchema>) {
  //   const isStatusChanged = form.formState.dirtyFields.status;
  //   const isOdooIdChanged = form.formState.dirtyFields.odooId;
  //   const isUserPricingLevelChanged = form.formState.dirtyFields.level;

  //   try {
  //     if (isStatusChanged || isOdooIdChanged || isUserPricingLevelChanged) {
  //       await execute({
  //         userId: user?.documentId!,
  //         email: values.email,
  //         accountStatus: values.status,
  //         odooId: values.odooId,
  //         userPricingLevel: values.level,
  //       });
  //     }
  //   } catch (error) {
  //     toast.error('Something went wrong. Please try again later.');
  //   }
  // }

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Enum_Accountdetail_Level.Small}>SMALL</SelectItem>
                    <SelectItem value={Enum_Accountdetail_Level.MidSized}>MID-SIZED</SelectItem>
                    <SelectItem value={Enum_Accountdetail_Level.Vip}>VIP</SelectItem>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Enum_Userspermissionsuser_Account_Status.Pending}>Pending</SelectItem>
                    <SelectItem value={Enum_Userspermissionsuser_Account_Status.Reviewing}>
                      Reviewing
                    </SelectItem>
                    <SelectItem value={Enum_Userspermissionsuser_Account_Status.Approved}>
                      Approved
                    </SelectItem>
                    <SelectItem value={Enum_Userspermissionsuser_Account_Status.Denied}>Denied</SelectItem>
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
            name="companyNumber"
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
        <Button disabled={status === 'executing'} type="submit" className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default UserProfileForm;
