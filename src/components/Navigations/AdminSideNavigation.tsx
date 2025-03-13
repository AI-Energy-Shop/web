'use client';
import Profile from './Profile';
import NavList from './NavList';
import { RootState } from '@/store/store';
import { logoutUser } from '@/app/actions/user';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Me, removeUserData } from '@/store/features/me';
import { ADMIN_SIDE_NAVIGATIONS } from '@/constant';

const AdminSideNavigation = () => {
  const me = useSelector((state: RootState) => state.me.me);
  const [user, setUser] = useState<Me | undefined>(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(me);
  }, [me]);

  const handleLogout = () => {
    dispatch(removeUserData());
    logoutUser();
  };

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
        <Profile user={user} handleLogout={handleLogout} />
      </div>
    </aside>
  );
};

export default AdminSideNavigation;
