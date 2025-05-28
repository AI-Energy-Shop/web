'use client';

import React from 'react';
import { User } from 'lucide-react';
import Link from 'next/link';
import { RootState, useAppSelector } from '@/store/store';

const UserIconButton = () => {
  const user = useAppSelector((state: RootState) => state.me.me);

  return (
    <div className="h-[40px] flex flex-col items-center justify-between">
      <Link
        href="/profile"
        className="flex flex-col items-center m-0 w-auto h-auto gap-[1px]"
      >
        <User className="h-4 w-4 lg:h-5 lg:w-5" />
        <p className="text-xs lg:text-sm h-[15px]">{user?.business_name}</p>
      </Link>
    </div>
  );
};

export default UserIconButton;
