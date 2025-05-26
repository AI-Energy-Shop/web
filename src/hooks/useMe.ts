'use client';
import { Me } from '@/store/features/me';
import { RootState, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

const useMe = () => {
  const userData = useAppSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return {
    user,
  };
};

export default useMe;
