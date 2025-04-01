'use client';
import { Me } from '@/store/features/me';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useMe = () => {
  const userData = useSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return {
    user,
  };
};

export default useMe;
