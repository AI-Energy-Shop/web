'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { MapPin } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ShippingAddress = () => {
  const shippingAddress = useSelector(
    (state: RootState) => state.cart.shippingAddress
  );

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input value={shippingAddress?.city} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Street</Label>
              <Input value={shippingAddress?.street} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="suburb">Suburb</Label>
              <Input value={shippingAddress?.suburb} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state_territory">State/Territory</Label>
              <Input value={shippingAddress?.state_territory} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input value={shippingAddress?.postcode} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default ShippingAddress;
