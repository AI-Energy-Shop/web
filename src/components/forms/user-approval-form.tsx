'use client';
import React from 'react';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { approveUser } from '@/app/actions/auth';
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
import {
  ACCOUNT_STATUS_DATA,
  USER_LEVEL_DATA,
  USER_TYPE_DATA,
} from '@/constant/user';

interface UserApprovalFormProps {
  documentId: string;
  defaultValues: {
    email: string;
    username: string;
    businessName: string;
    businessNumber: string;
    businessType: string;
    phone: string;
    street1: string;
    street2: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
}

type RenderSelectFieldProps = {
  name: keyof z.infer<typeof userApprovalSchema>;
  label: string;
  disabled: boolean;
  required: boolean;
  placeholder: string;
  data: { value: string; label: string }[];
};

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
      street1: props.defaultValues.street1,
      street2: props.defaultValues.street2,
      city: props.defaultValues.city,
      state: props.defaultValues.state,
      country: props.defaultValues.country,
      zipCode: props.defaultValues.zipCode,
      phone:
        props.defaultValues.phone === 'null' ? '' : props.defaultValues.phone,
      businessType: props.defaultValues.businessType.toLowerCase(),
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
      if (value !== null) {
        formData.append(key, value);
      }
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
    disabled: boolean = false,
    required: boolean = true
  ) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="">
              {label}
              {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={disabled}
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderSelectField = ({
    name,
    label,
    disabled,
    required,
    placeholder,
    data,
  }: RenderSelectFieldProps) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field?.value || ''}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-5">
              {renderTextField('businessName', 'Business Name', true)}
              {renderTextField('businessNumber', 'ABN / ACN', true)}
              {renderTextField('username', 'Username', true)}
              {renderTextField('email', 'Email', true)}
              {renderTextField('street1', 'Street 1', true)}
              {renderTextField('street2', 'Street 2', true)}
              {renderTextField('city', 'City', true)}
              {renderTextField('state', 'State', true)}
              {renderTextField('zipCode', 'Postal Code', true)}
              {renderTextField('country', 'Country', true)}
              {renderTextField('phone', 'Phone', true)}
              {renderSelectField({
                disabled: true,
                required: true,
                name: 'businessType',
                label: 'Business Type',
                data: USER_TYPE_DATA,
                placeholder: 'Select business type',
              })}
              {renderSelectField({
                required: true,
                disabled: false,
                name: 'userLevel',
                label: 'User Level',
                data: USER_LEVEL_DATA,
                placeholder: 'Select user level',
              })}
              {renderTextField('odooUserId', 'Odoo User ID', false, false)}
              {renderSelectField({
                disabled: false,
                required: true,
                name: 'accountStatus',
                label: 'Account Status',
                data: ACCOUNT_STATUS_DATA,
                placeholder: 'Select account status',
              })}
            </div>
          </div>
          <div className="flex gap-4">
            <Button type="submit">Submit</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => router.push('/admin/users')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserApprovalForm;
