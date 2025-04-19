'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { MapPin } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ShippingAddress as ShippingAddressType } from '@/store/features/cart';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const shippingAddressSchema = z.object({
  street1: z.string(),
  street2: z.string(),
  city: z.string(),
  state_territory: z.string(),
  zip_code: z.string(),
  country: z.string(),
});
const ShippingAddress = () => {
  const shippingAddresses = useSelector((state: RootState) => state.me.me?.account_detail?.shipping_addresses);

  const address = shippingAddresses?.find((address) => address.isActive === true);

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      street1: address?.street1 || '',
      street2: address?.street2 || '',
      city: address?.city || '',
      state_territory: address?.state || '',
      zip_code: address?.zipCode || '',
      country: address?.country || '',
    },
  });

  return (
    <Card id="shippingAddress">
      <CardHeader>
        <CardTitle>Shipping Settings</CardTitle>
        <CardDescription>Manage your shipping addresses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Shipping
          </div>
          <Form {...form}>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="street1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street 1</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="street2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street 2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="state_territory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Territory</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="zip_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">{/* <Button type="submit">Save Changes</Button> */}</CardFooter>
    </Card>
  );
};

export default ShippingAddress;
