'use client';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SIDE_NAVIGATIONS, type SideNavigation } from '@/constant';
import Icon from '../Icon';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
const SideNavigation = ({iconSize}: {iconSize: number}) => {
  const router = useRouter();
  const path = usePathname();

  // Initialize state from SIDE_NAVIGATIONS
  const [navigations, setNavigations] = useState(SIDE_NAVIGATIONS);

  const handleNavClick = (item: SideNavigation) => {
    // Update active state in navigations
    const updatedNavigations = navigations.map((nav) => ({
      ...nav,
      active: nav.id === item.id,
    }));
    setNavigations(updatedNavigations);

    // Navigate to the selected route
    router.replace(item.href);
  };

  return (
    <aside className="w-full h-full bg-white dark:bg-gray-800 flex flex-col">
      <div className="h-full w-full flex flex-col">
        <div className="h-[10%] w-full p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center">
            AI ENERGY SHOP
          </h2>
        </div>

        <nav className="h-[80%] w-full">
          {navigations.map((item) => (
            <div
              key={item.id}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                ${item.active
                  ? 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700'
                  : 'text-gray-600 dark:text-gray-400 '
                }
              `}
              onClick={() => handleNavClick(item)}
            >
              <Icon name={item.icon} size={iconSize} width={iconSize} height={iconSize} />
              {item.label}
            </div>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="h-[10%] w-full p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="w-full flex items-center justify-center">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNavigation;
