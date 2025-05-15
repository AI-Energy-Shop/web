'use client';
import Profile from './Profile';
import NavList from './NavList';
import React from 'react';
import { ADMIN_SIDE_NAVIGATIONS } from '@/constant';
import useMe from '@/hooks/useMe';
import { logoutUser } from '@/app/actions/user';
import Logo from './Logo';
const AdminSideNavigation = () => {
  const user = useMe();
  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem('persist:root');
  };
  return (
    <aside className="h-full w-full border ">
      <div className="h-full w-full flex flex-col gap-4">
        <div className="w-full p-4">
          <Logo />
        </div>
        <NavList
          showIcon={true}
          data={ADMIN_SIDE_NAVIGATIONS}
          className="h-full flex-col items-baseline"
        />
        <Profile user={user.user} onLogout={handleLogout} />
      </div>
    </aside>
  );
};

export default AdminSideNavigation;
