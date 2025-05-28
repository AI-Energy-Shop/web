import LogoutButton from '@/components/profile/logout-button';
import Personals from '@/components/profile/personals';
import ShippingAddress from '@/components/profile/shipping-address';
import Warehouse from '@/components/profile/warehouse';
import React from 'react';

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-[1200px]">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="grid gap-6 mb-6">
          <Personals />
          <div className="flex gap-6">
            <ShippingAddress />
            <Warehouse />
          </div>
          <LogoutButton />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
