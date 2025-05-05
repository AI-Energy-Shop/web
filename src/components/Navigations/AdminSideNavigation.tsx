'use client';
import Profile from './Profile';
import NavList from './NavList';
import React from 'react';
import { RootState, useAppSelector } from '@/store/store';
import { ADMIN_SIDE_NAVIGATIONS } from '@/constant';

const AdminSideNavigation = () => {
  const me = useAppSelector((state: RootState) => state.me.me);
  return (
    <aside className="h-full w-full border ">
      <div className="h-full w-full flex flex-col gap-4">
        <div className="w-full p-4">
          <h1>AI ENERGY</h1>
        </div>
        <NavList showIcon={true} data={ADMIN_SIDE_NAVIGATIONS} className="h-full flex-col items-baseline" />
        <Profile user={me} handleLogout={() => {}} />
      </div>
    </aside>
  );
};

export default AdminSideNavigation;
