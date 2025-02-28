'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Me } from '@/store/features/me';

const UserIconButton = () => {
  const me = useSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);

  useEffect(() => {
    if (me) {
      setUser(me);
    }
  }, [me]);

  if (!user?.account_detail?.business_name) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <User className="h-5 w-5" />
      <p className="text-sm font-normal">
        {user?.account_detail?.business_name}
      </p>
    </Button>
  );
};

export default UserIconButton;
