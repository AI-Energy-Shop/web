'use client';
import Profile from './Profile';
import React from 'react';
import { ADMIN_SIDE_NAVIGATIONS } from '@/constant';
import useMe from '@/hooks/useMe';
import { logoutUser } from '@/app/actions/user';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Icon from '../Icon';

const AdminSideNavigation = () => {
  const user = useMe();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (item: any) => {
    if (item.enabled) {
      router.push(item.href);
    }
  };

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
        <nav className={`flex flex-col h-full text-sm font-medium `}>
          {ADMIN_SIDE_NAVIGATIONS.map((item, idx) => {
            const isPath =
              idx === 0
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + '/');
            return (
              <div
                title={item.enabled ? item.label : 'Coming Soon'}
                key={item.id}
                onClick={() => handleClick(item)}
                className={cn(
                  'p-2',
                  'transition-all duration-100 hover:text-primary hover:bg-[#f05b3d] group',
                  item.enabled ? 'cursor-pointer' : 'cursor-not-allowed',
                  isPath ? 'border-b-2 bg-[#f05b3d]' : 'font-normal'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Icon
                      name={item.icon}
                      size={15}
                      className="transition-all duration-200 group-hover:scale-110"
                    />
                  </div>
                  {item.label}
                </div>
              </div>
            );
          })}
        </nav>
        <Profile user={user.user} onLogout={handleLogout} />
      </div>
    </aside>
  );
};

export default AdminSideNavigation;
