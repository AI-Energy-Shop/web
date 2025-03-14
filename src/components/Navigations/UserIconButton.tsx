'use client';

import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { Me } from '@/store/features/me';

const UserIconButton = () => {
  const me = useSelector((state: RootState) => state.me.me);

  const [user, setUser] = useState<Me | undefined>(undefined);

  useEffect(() => {
    if (me) {
      setUser(me);
    }
  }, [me]);

  // If no user data, show login link instead
  if (!user?.business_name) {
    return (
      <Link
        href="/auth/login"
        className="flex flex-col items-center m-0 w-auto h-auto px-1"
      >
        <User className="h-5 w-5" />
        <p className="text-sm font-normal">Login</p>
      </Link>
    );
  }

  return (
    <Link
      href="/profile"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <User className="h-5 w-5" />
      <p className="text-sm font-normal">{user.business_name}</p>
    </Link>
  );
};

export default UserIconButton;
