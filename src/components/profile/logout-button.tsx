'use client';

import React from 'react';
import { logoutUser } from '@/app/actions/auth';
import { Button } from '../ui/button';
import { removePersistence, useAppDispatch } from '@/store/store';
import { logout } from '@/store/features/me';
import { removeCartsData } from '@/store/features/cart';

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(removeCartsData());
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
