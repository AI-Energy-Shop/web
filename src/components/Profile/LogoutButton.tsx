'use client';

import React from 'react';
import { logoutUser } from '@/app/actions/user';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/features/me';
import { useRouter } from 'next/navigation';
import { removeCartsData } from '@/store/features/cart';
const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    dispatch(logout());
    dispatch(removeCartsData());
    await logoutUser();
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
