'use client';
import { UserQuery } from '@/lib/gql/graphql';
import { Me } from '@/store/features/me';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useMe = () => {
  const [me, setMe] = useState<Me | null>(null);
  const user = useSelector((state: RootState) => state.me.me);

  useEffect(() => {
    if (user) {
      setMe(user);
    }
  }, [user]);

  return {
    me,
  };
};

export default useMe;
