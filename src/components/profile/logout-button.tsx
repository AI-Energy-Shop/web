'use client';

import React from 'react';
import { logoutUser } from '@/app/actions/user';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    router.refresh();
    router.push('/auth/login');
    localStorage.removeItem('persist:root');
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
