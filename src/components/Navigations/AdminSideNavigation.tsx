'use client';
import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Me } from '@/store/features/me';
import { ADMIN_SIDE_NAVIGATIONS } from '@/constant';
import NavList from './NavList';

const AdminSideNavigation = () => {
  const me = useSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);

  useEffect(() => {
    setUser(me);
  }, [me]);

  return (
    <aside className="h-full w-full border p-4 ">
      <div className="h-full w-full flex flex-col gap-4">
        <div>
          <h1>Admin Sidebar</h1>
        </div>

        <NavList
          data={ADMIN_SIDE_NAVIGATIONS}
          className="h-full flex-col items-baseline"
        />
        <Profile user={user} handleLogout={() => {}} />
      </div>
    </aside>
  );
};

export default AdminSideNavigation;
