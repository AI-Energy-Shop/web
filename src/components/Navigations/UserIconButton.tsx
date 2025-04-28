'use client';

import React from 'react';
import { User } from 'lucide-react';
import { RootState, useAppSelector } from '@/store/store';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const UserIconButton = () => {
  const user = useAppSelector((state: RootState) => state.me.me);

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

// Export as a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(UserIconButton), {
  ssr: false,
});
