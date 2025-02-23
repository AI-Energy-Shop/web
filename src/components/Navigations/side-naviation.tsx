'use client';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SIDE_NAVIGATIONS } from '@/constant';
import Icon from '../Icon';
import { usePathname } from 'next/navigation';


  
const SideNavigation = () => {
  const pathname = usePathname();
  return (
    <aside className="h-full w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-full w-full">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            AI ENERGY SHOP
          </h2>
        </div>

        <nav className="mt-4">
          {SIDE_NAVIGATIONS.map((item) => {
            const active = pathname.endsWith(item.href);
            return (
              <Link
                key={item.id}
                href={`/admin/${item.href}`}
                className={`flex items-center px-4 py-2 ${active ? 'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Icon className="mr-3" name={item.icon} size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              john@example.com
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SideNavigation;
