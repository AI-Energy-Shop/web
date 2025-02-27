'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const UserIconButton = () => {
  const me = useSelector((state: RootState) => state.me);
  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex flex-col items-center m-0 w-auto h-auto px-1"
    >
      <User className="h-5 w-5" />
      <p className="text-sm font-normal">Username</p>
    </Button>
  );
};

export default UserIconButton;
