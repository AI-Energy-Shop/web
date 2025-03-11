'use client';
import React from 'react';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { approveUser } from '@/app/actions/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { userApprovalSchema } from '@/lib/validation-schema/user-approval';
import { useRouter } from 'next/navigation';

interface UserApprovalFormProps {
  documentId: string;
  defaultValues: {
    type: string;
    email: string;
    username: string;
    businessName: string;
    businessNumber: string;
    phone: string;
    street: string;
    suburb: string;
    state: string;
    postalCode: string;
    userType: string;
  };
}

const UserApprovalForm: React.FC<UserApprovalFormProps> = (props) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof userApprovalSchema>>({
    resolver: zodResolver(userApprovalSchema),
    defaultValues: {
      documentId: props.documentId,
      businessName: props.defaultValues.businessName,
      businessNumber: props.defaultValues.businessNumber,
      username: props.defaultValues.username,
      email: props.defaultValues.email,
      street: props.defaultValues.street,
      suburb: props.defaultValues.suburb,
      state: props.defaultValues.state,
      postalCode: props.defaultValues.postalCode,
      phone: props.defaultValues.phone,
      userType: props.defaultValues.userType,
      accountStatus: 'REVIEWING',
      userLevel: '',
      odooUserId: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof userApprovalSchema>) => {
    if (data.accountStatus === 'REVIEWING') {
      toast({
        title: 'Warning',
        description: 'Account status must be "APPROVED" or "DENIED"',
      });
      form.setFocus('accountStatus');
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const { data: approveData, error } = await approveUser(formData);

    if (error) {
      toast({
        title: 'Error',
        description: error,
      });
      return;
    }
    toast({
      title: 'Success',
      description: `User ${approveData?.approvedUser?.email} approved successfully`,
    });
    router.push('/admin/users');
  };

  const renderTextField = (
    name: keyof z.infer<typeof userApprovalSchema>,
    label: string,
    disabled: boolean = false
  ) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="">
              {label}
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input {...field} disabled={disabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <>
      {/* <Dialogs.Registration
        open={showModal}
        onOpenChange={() => setShowModal(false)}
        userData={userDetails}
        execute={execute}
      /> */}
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-5">
                {renderTextField('businessName', 'Business Name', true)}
                {renderTextField('businessNumber', 'ABN / ACN', true)}
                {renderTextField('username', 'Username', true)}
                {renderTextField('email', 'Email', true)}
                {renderTextField('street', 'Street', true)}
                {renderTextField('suburb', 'Suburb', true)}
                {renderTextField('state', 'State', true)}
                {renderTextField('postalCode', 'Postal Code', true)}
                {renderTextField('phone', 'Phone', true)}
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select user type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="installer">INSTALLER</SelectItem>
                            <SelectItem value="retailer">RETAILER</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Level</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select user level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SMALL">SMALL</SelectItem>
                            <SelectItem value="MID-SIZED">MID SIZE</SelectItem>
                            <SelectItem value="VIP">VIP</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {renderTextField('odooUserId', 'Odoo User ID', false)}
                <FormField
                  control={form.control}
                  name="accountStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select user level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="REVIEWING">REVIEWING</SelectItem>
                            <SelectItem value="APPROVED">APPROVED</SelectItem>
                            <SelectItem value="DENIED">DENIED</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UserApprovalForm;
