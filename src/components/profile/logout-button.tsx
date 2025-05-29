'use client';

import React from 'react';
import { logoutUser } from '@/app/actions/auth';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { removePersistence, useAppDispatch } from '@/store/store';
import { logout } from '@/store/features/me';
const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logout());
    removePersistence();
    await logoutUser();
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
