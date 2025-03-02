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
import { User } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Shield } from 'lucide-react';
import { Building2, Image as ImageIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Image from 'next/image';

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

  useEffect(() => {
    if (me) {
      setUserData({
        name: me.name || undefined,
        companyName: me.account_detail?.business_name || '',
        email: me.email || '',
        userLevel: me.account_detail?.user_level || '',
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
        {/* Read-only fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex space-x-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="name">Name</Label>
              </div>
              <Input
                id="name"
                value={userData.name?.first_name}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="middle_name">Middle Name</Label>
              </div>
              <Input
                id="middle_name"
                value={userData.name?.middle_name}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="middle_name">Middle Name</Label>
              </div>
              <Input
                id="last_name"
                value={userData.name?.last_name}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>
          </div>
          <div className="space-y-2 flex flex-col items-center">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="companyName">Company Logo</Label>
            </div>
            <Image
              src="/no-product-image.jpg"
              alt="Company Logo"
              width={150}
              height={150}
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="companyName">Company Name</Label>
            </div>
            <Input
              id="companyName"
              value={userData.companyName}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          </div>
        </div>

        <Separator className="my-4" />
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                id="email"
                value={userData.email}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="phone">Phone</Label>
              </div>
              <Input
                id="phone"
                value={userData.phone}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="telephone">Telephone</Label>
              </div>
              <Input
                id="telephone"
                value={userData.telephone}
                readOnly
                className="bg-muted cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="userLevel">User Level</Label>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{userData.userLevel}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </CardFooter> */}
    </Card>
  );
};

export default Personals;
