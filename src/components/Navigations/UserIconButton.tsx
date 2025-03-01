'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Me } from '@/store/features/me';
import Link from 'next/link';

const UserIconButton = () => {
  const me = useSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);

  useEffect(() => {
    if (me) {
      setUser(me);
    }
  }, [me]);

  return (
    <Link
      href="/profile"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <User className="h-5 w-5" />
      {user ? (
        <p className="text-sm font-normal">
          {user?.account_detail?.business_name}
        </p>
      ) : (
        <p className="text-sm font-normal">Profile</p>
      )}
    </Link>
  );
};

export default UserIconButton;
