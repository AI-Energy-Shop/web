'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { MapPin } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { WarehouseLocation } from '@/store/features/cart';
import { useState, useEffect } from 'react';

const Warehouse = () => {
  const warehouseLocation = useSelector((state: RootState) => state.cart.warehouseLocation);

  const [warehouse, setWarehouse] = useState<WarehouseLocation | null>(null);

  useEffect(() => {
    if (warehouseLocation) {
      setWarehouse(warehouseLocation);
    }
  }, [warehouseLocation]);

  return (
    <Card id="warehouseAddress">
      <CardHeader>
        <CardTitle>Warehouse Settings</CardTitle>
        <CardDescription>Manage your warehouse and delivery addresses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Warehouse
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="street1">Street 1</Label>
              <Input value={warehouseLocation?.address?.street1 || ''} onChange={() => {}} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input value={warehouse?.address?.city || ''} onChange={() => {}} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state_territory">State/Territory</Label>
              <Input value={warehouse?.address?.state || ''} onChange={() => {}} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input value={warehouse?.address?.zipCode || ''} onChange={() => {}} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postcode">Country</Label>
              <Input value={warehouse?.address?.country || ''} onChange={() => {}} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">{/* <Button type="submit">Save Changes</Button> */}</CardFooter>
    </Card>
  );
};

export default Warehouse;
