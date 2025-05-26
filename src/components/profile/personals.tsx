'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartNoAxesCombined } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema } from '@/lib/validation-schema/user-profile-form';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl } from '../ui/form';
import ImageUploadInput from './image-upload';
interface UserData {
  name?: {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
  };
  companyName?: string;
  email?: string;
  phone?: string;
  telephone?: string;
  userLevel?: string;
  warehouseAddress?: string;
  deliveryAddress?: string;
}

const Personals = () => {
  const me = useSelector((state: RootState) => state.me.me);
  const [readOnlyData, setReadOnlyData] = useState<{ level?: string }>({
    level: '',
  });

  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      email: me?.email,
      username: me?.username,
      phone: me?.phone,
      type: me?.business_type?.toUpperCase(),
      companyName: me?.business_name,
      companyNumber: me?.business_number,
    },
  });

  const [userData, setUserData] = useState<UserData>({
    name: {
      first_name: '',
      middle_name: '',
      last_name: '',
    },
    companyName: '',
    email: '',
    telephone: '',
    userLevel: '',
  });

  const [imageUrl, setImageUrl] = useState<string>('');

  const onSubmit = (data: z.infer<typeof userProfileSchema>) => {
    console.log(data);
  };

  const handleImageChange = (url: string) => {
    setImageUrl(url);
    // toast({
    //   title: 'Success',
    //   description: 'Profile image updated successfully',
    // });
  };

  const handleImageRemove = () => {
    setImageUrl('');
    // toast({
    //   title: 'Success',
    //   description: 'Profile image removed successfully',
    // });
  };

  useEffect(() => {
    if (me) {
      setReadOnlyData({
        level: me?.account_detail?.level,
      });
    }
  }, [me]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your personal and company information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="col-start-4 space-y-2">
          <div className="flex items-center gap-2">
            <ChartNoAxesCombined className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="userLevel">User Level</Label>
          </div>
          <Badge variant="outline" className="my-[8px] h-[36px]">
            {readOnlyData.level}
          </Badge>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2 flex flex-col justify-between">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2 flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="companyName">Company Logo</Label>
                </div>
                <ImageUploadInput
                  form={form}
                  onChange={handleImageChange}
                  onRemove={handleImageRemove}
                />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
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
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Separator className="my-4" />
            {form.formState.isDirty && (
              <Button type="submit">Save Changes</Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end"></CardFooter>
    </Card>
  );
};

export default Personals;
