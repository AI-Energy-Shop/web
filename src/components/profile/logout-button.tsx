'use client';

import React from 'react';
import { logoutUser } from '@/app/actions/auth';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { removePersistence } from '@/store/store';
const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    removePersistence();
    router.refresh();
    router.push('/auth/login');
    window.location.reload();
  };

  return (
    <div className="flex gap-6">
      <Button variant="destructive" onClick={handleLogout}>
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default LogoutButton;
