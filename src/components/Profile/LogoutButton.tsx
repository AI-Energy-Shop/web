'use client';

import React from 'react';
import { logoutUser } from '@/app/actions/user';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { removeUserData } from '@/store/features/me';
import { useRouter } from 'next/navigation';
import useCart from '@/hooks/useCart';
const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { clearCartItems } = useCart();
  const handleLogout = async () => {
    dispatch(removeUserData());
    await logoutUser();
    clearCartItems();
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
