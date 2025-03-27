'use client';
import { Me } from '@/store/features/me';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useMe = () => {
  const user = useSelector((state: RootState) => state.me.me);
  const tokenString = useSelector((state: RootState) => state.me.token);
  const [me, setMe] = useState<Me | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (tokenString) {
      setToken(tokenString);
    }
  }, [tokenString]);

  useEffect(() => {
    if (user) {
      setMe(user);
    }
  }, [user]);

  return {
    me,
    token,
  };
};

export default useMe;
